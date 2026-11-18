export type Role = "driver" | "passenger";
export type RideStatus =
  "open" | "accepted_by_driver" | "confirmed" | "rejected" | "cancelled";
export type VehicleType = "bike" | "car";
export interface Place {
  id: string;
  name: string;
  subtitle: string;
  latitude: number;
  longitude: number;
}
export interface Vehicle {
  makeModel: string;
  color: string;
  plate: string;
}
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  joinedAt: string;
  memberSince?: string;
  rating: number;
  trips: number;
  bio: string;
  onboardingComplete?: boolean;
  licenseNumber?: string;
  vehicleType?: VehicleType;
  vehicle?: Vehicle;
  fare?: number;
  currency?: string;
  etaMinutes?: number;
  distanceKm?: number;
}
export interface Driver extends UserProfile {
  role: "driver";
  vehicleType: VehicleType;
  vehicle: Vehicle;
  etaMinutes: number;
  fare: number;
  currency: string;
  distanceKm: number;
}
export interface RideRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  pickup: Place;
  dropoff: Place;
  fare: number;
  currency: string;
  status: RideStatus;
  createdAt: number;
  driverId?: string;
  driverName?: string;
}
export interface ChatMessage {
  id: string;
  requestId: string;
  senderId?: string;
  senderName: string;
  senderRole: Role;
  text: string;
  createdAt: number;
}
