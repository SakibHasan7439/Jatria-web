import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  MessageCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useRideStore } from "../stores/rideStore";
import type { RideRequest, RideStatus } from "../types";

const statusCopy: Record<RideStatus, string> = {
  open: "Waiting for a driver",
  accepted_by_driver: "Driver accepted",
  confirmed: "Ride confirmed",
  rejected: "Declined",
  cancelled: "Cancelled",
};
const requestRenderTime = Date.now();
export function RequestsPage() {
  const user = useAuthStore((state) => state.user)!;
  const requests = useRideStore((state) => state.requests);
  const rideReady = useRideStore((state) => state.isReady);
  const rideError = useRideStore((state) => state.error);
  const accept = useRideStore((state) => state.acceptRequest);
  const reject = useRideStore((state) => state.rejectRequest);
  const confirm = useRideStore((state) => state.confirmRequest);
  const cancel = useRideStore((state) => state.cancelRequest);
  const location = useLocation();
  const success = (location.state as { success?: string } | null)?.success;
  const [actionError, setActionError] = useState("");
  async function perform(action: () => Promise<unknown>) {
    setActionError("");
    try {
      await action();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Could not update this ride request.",
      );
    }
  }
  const visible = useMemo(
    () =>
      user.role === "driver"
        ? requests.filter(
            (request) =>
              request.status === "open" || request.driverId === user.id,
          )
        : requests.filter((request) => request.passengerId === user.id),
    [requests, user.id, user.role],
  );
  const openCount = requests.filter(
    (request) => request.status === "open",
  ).length;
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">YOUR JOURNEYS</div>
          <h1>
            {user.role === "driver" ? "Ride requests" : "Your ride requests"}
          </h1>
          <p className="page-lede">
            {user.role === "driver"
              ? `${openCount} open requests are waiting for a driver in Dhaka.`
              : "Track driver responses and confirm the ride that works for you."}
          </p>
        </div>
        {user.role === "passenger" && (
          <Link to="/app/rides" className="button button-primary">
            Find a ride <ArrowRight size={16} />
          </Link>
        )}
      </div>
      {success && (
        <div className="success-banner">
          <CheckCircle2 size={17} />
          {success}
        </div>
      )}
      {actionError && (
        <div className="form-error" role="alert">
          {actionError}
        </div>
      )}
      {!rideReady ? (
        <div className="surface-card request-empty">
          Loading Jatria ride requests…
        </div>
      ) : rideError ? (
        <div className="form-error" role="alert">
          {rideError}
        </div>
      ) : visible.length === 0 ? (
        <div className="surface-card request-empty">
          <div className="empty-icon">
            <Clock3 size={21} />
          </div>
          <h3>
            {user.role === "driver"
              ? "No requests to review"
              : "No ride requests yet"}
          </h3>
          <p>
            {user.role === "driver"
              ? "New passenger requests will show up here."
              : "Plan a trip and drivers in your area can respond."}
          </p>
          {user.role === "passenger" && (
            <Link to="/app/rides" className="button button-primary">
              Plan a ride <ArrowRight size={15} />
            </Link>
          )}
        </div>
      ) : (
        <div className="request-list">
          {visible.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isDriver={user.role === "driver"}
              userId={user.id}
              onAccept={() => void perform(() => accept(request.id, user))}
              onReject={() => void perform(() => reject(request.id, user))}
              onConfirm={() =>
                void perform(async () => {
                  if (!(await confirm(request.id, user)))
                    throw new Error(
                      "This ride is no longer waiting for your confirmation.",
                    );
                })
              }
              onCancel={() => void perform(() => cancel(request.id, user.id))}
            />
          ))}
        </div>
      )}
    </section>
  );
}
function RequestCard({
  request,
  isDriver,
  userId,
  onAccept,
  onReject,
  onConfirm,
  onCancel,
}: {
  request: RideRequest;
  isDriver: boolean;
  userId: string;
  onAccept: () => void;
  onReject: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const passenger = request.passengerId === userId;
  const elapsed = Math.max(
    1,
    Math.floor((requestRenderTime - request.createdAt) / 60000),
  );
  const person = isDriver
    ? request.passengerName
    : (request.driverName ?? request.passengerName);
  return (
    <article className="surface-card request-card">
      <div className="request-card-top">
        <div className="request-person">
          <div className="request-avatar">
            {person
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <b>{person}</b>
            <small>
              {isDriver
                ? "Passenger request"
                : passenger
                  ? "Your request"
                  : "Driver"}{" "}
              <i /> {elapsed} min ago
            </small>
          </div>
        </div>
        <span className={`status-pill status-${request.status}`}>
          <i />
          {statusCopy[request.status]}
        </span>
      </div>
      <div className="request-route">
        <div className="request-route-line">
          <span />
          <i />
          <span />
        </div>
        <div className="route-stop">
          <b>{request.pickup.name}</b>
          <small>{request.pickup.subtitle}</small>
        </div>
        <div className="route-stop">
          <b>{request.dropoff.name}</b>
          <small>{request.dropoff.subtitle}</small>
        </div>
        <div className="request-fare">
          <small>PROPOSED FARE</small>
          <b>
            {request.currency}
            {request.fare}
          </b>
        </div>
      </div>
      <div className="request-card-bottom">
        <div className="request-context">
          {request.status === "open"
            ? "This request is visible to nearby drivers."
            : request.status === "accepted_by_driver"
              ? `Accepted by ${request.driverName}. ${passenger ? "Confirm to open ride chat." : "Waiting for passenger confirmation."}`
              : request.status === "confirmed"
                ? "Both sides confirmed. Chat is now available."
                : statusCopy[request.status]}
        </div>
        <div className="request-actions">
          {isDriver && request.status === "open" && (
            <>
              <button className="button button-quiet" onClick={onReject}>
                <X size={15} />
                Decline
              </button>
              <button className="button button-primary" onClick={onAccept}>
                <Check size={15} />
                Accept ride
              </button>
            </>
          )}
          {passenger && request.status === "accepted_by_driver" && (
            <>
              <button className="button button-quiet danger" onClick={onCancel}>
                <X size={15} />
                Cancel
              </button>
              <button className="button button-primary" onClick={onConfirm}>
                <CheckCircle2 size={15} />
                Confirm ride
              </button>
            </>
          )}
          {request.status === "confirmed" && (
            <Link to="/app/chat" className="button button-primary">
              <MessageCircle size={15} />
              Open chat
            </Link>
          )}
          {passenger && request.status === "open" && (
            <button className="button button-quiet danger" onClick={onCancel}>
              <X size={15} />
              Cancel request
            </button>
          )}
          {isDriver &&
            request.driverId === userId &&
            request.status === "accepted_by_driver" && (
              <button className="button button-quiet" onClick={onCancel}>
                <RotateCcw size={15} />
                Withdraw
              </button>
            )}
        </div>
      </div>
    </article>
  );
}
