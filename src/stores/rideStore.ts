import { create } from "zustand";
import type { Place, RideRequest, Role, UserProfile } from "../types";
import {
  acceptRideRequest,
  cancelRideRequest,
  confirmRideRequest,
  createRideRequest,
  rejectRideRequest,
  subscribeRequests,
} from "../services/firebase/requests";
import { sendChatMessage } from "../services/chat/firebaseChat";

type RideState = {
  requests: RideRequest[];
  isReady: boolean;
  error: string | null;
  initialize: () => Promise<() => void>;
  createRequest: (
    passenger: UserProfile,
    pickup: Place,
    dropoff: Place,
    fare: number,
  ) => Promise<RideRequest>;
  acceptRequest: (requestId: string, driver: UserProfile) => Promise<void>;
  rejectRequest: (requestId: string, driver: UserProfile) => Promise<void>;
  confirmRequest: (
    requestId: string,
    passenger: UserProfile,
  ) => Promise<boolean>;
  cancelRequest: (requestId: string, userId: string) => Promise<void>;
};
const activeStatuses: RideRequest["status"][] = [
  "open",
  "accepted_by_driver",
  "confirmed",
];
export function getActiveRideRequest(
  requests: RideRequest[],
  userId: string,
  role: Role,
) {
  return (
    requests.find(
      (request) =>
        activeStatuses.includes(request.status) &&
        (role === "passenger"
          ? request.passengerId === userId
          : request.driverId === userId),
    ) ?? null
  );
}
export const useRideStore = create<RideState>()((set, get) => ({
  requests: [],
  isReady: false,
  error: null,
  initialize: async () => {
    let disposed = false;
    set({ isReady: false, error: null });
    try {
      const unsubscribe = await subscribeRequests(
        (requests) => {
          if (!disposed) set({ requests, isReady: true, error: null });
        },
        (error) => {
          if (!disposed) set({ isReady: true, error: error.message });
        },
      );
      return () => {
        disposed = true;
        unsubscribe();
      };
    } catch (error) {
      set({
        isReady: true,
        error:
          error instanceof Error
            ? error.message
            : "Could not load ride requests.",
      });
      return () => {
        disposed = true;
      };
    }
  },
  createRequest: async (passenger, pickup, dropoff, fare) => {
    if (passenger.role !== "passenger")
      throw new Error("Only passengers can request a ride.");
    if (getActiveRideRequest(get().requests, passenger.id, "passenger"))
      throw new Error("You already have an active ride request.");
    const request = await createRideRequest({
      passenger,
      pickup,
      dropoff,
      fare,
      currency: "৳",
    });
    set((state) => ({
      requests: [
        request,
        ...state.requests.filter((current) => current.id !== request.id),
      ].sort((a, b) => b.createdAt - a.createdAt),
    }));
    return request;
  },
  acceptRequest: async (requestId, driver) => {
    if (driver.role !== "driver")
      throw new Error("Only drivers can accept ride requests.");
    if (getActiveRideRequest(get().requests, driver.id, "driver"))
      throw new Error("You already have an active ride.");
    await acceptRideRequest(requestId, driver);
  },
  rejectRequest: async (requestId, driver) => {
    if (driver.role !== "driver")
      throw new Error("Only drivers can reject ride requests.");
    await rejectRideRequest(requestId, driver.id);
  },
  confirmRequest: async (requestId, passenger) => {
    if (passenger.role !== "passenger")
      throw new Error("Only passengers can confirm a ride.");
    const confirmed = await confirmRideRequest(requestId, passenger.id);
    if (!confirmed) return false;
    await sendChatMessage({
      requestId,
      senderId: confirmed.driverId ?? "",
      senderRole: "driver",
      senderName: confirmed.driverName ?? "Driver",
      text: "Hi! I accepted your ride. See you at pickup.",
    });
    return true;
  },
  cancelRequest: async (requestId, userId) => {
    await cancelRideRequest(requestId, userId);
  },
}));
