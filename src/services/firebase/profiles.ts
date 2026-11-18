import type { Driver, UserProfile } from "../../types";
import { getFirebaseApp } from "./client";

type StoredProfile = Omit<UserProfile, "id" | "joinedAt"> & {
  uid: string;
  onboardingComplete: boolean;
  memberSince?: string;
};
function withoutUndefined<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withoutUndefined) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, withoutUndefined(item)]),
    ) as T;
  }
  return value;
}
function database() {
  return import("firebase/database").then(({ getDatabase }) =>
    getDatabase(getFirebaseApp()),
  );
}
function fromStored(uid: string, value: unknown): UserProfile | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Partial<StoredProfile>;
  if (!data.onboardingComplete || !data.role || !data.fullName || !data.email)
    return null;
  return {
    id: uid,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? "",
    role: data.role,
    joinedAt: data.memberSince ?? new Date().toISOString(),
    memberSince: data.memberSince,
    rating: data.rating ?? 4.8,
    trips: data.trips ?? 0,
    bio: data.bio ?? "",
    licenseNumber: data.licenseNumber,
    vehicleType: data.vehicleType,
    vehicle: data.vehicle,
    fare: data.fare,
    currency: data.currency,
    etaMinutes: data.etaMinutes,
    distanceKm: data.distanceKm,
  };
}
function toStored(profile: UserProfile): StoredProfile {
  return withoutUndefined({
    uid: profile.id,
    role: profile.role,
    fullName: profile.fullName,
    phone: profile.phone,
    email: profile.email,
    onboardingComplete: true,
    licenseNumber: profile.licenseNumber,
    vehicleType: profile.vehicleType,
    vehicle: profile.vehicle,
    rating: profile.rating,
    trips: profile.trips,
    bio: profile.bio,
    memberSince: profile.memberSince ?? profile.joinedAt,
    fare: profile.fare,
    currency: profile.currency,
    etaMinutes: profile.etaMinutes,
    distanceKm: profile.distanceKm,
  });
}
export async function getUserProfile(uid: string) {
  const db = await database();
  const { get, ref } = await import("firebase/database");
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? fromStored(uid, snapshot.val()) : null;
}
export async function setUserProfile(profile: UserProfile) {
  const db = await database();
  const { ref, set } = await import("firebase/database");
  await set(ref(db, `users/${profile.id}`), toStored(profile));
}
export async function updateUserProfile(
  uid: string,
  patch: Partial<UserProfile>,
) {
  const db = await database();
  const { ref, update } = await import("firebase/database");
  const stored: Record<string, unknown> = { ...patch };
  delete stored.id;
  if ("joinedAt" in stored) {
    stored.memberSince = stored.joinedAt;
    delete stored.joinedAt;
  }
  await update(ref(db, `users/${uid}`), withoutUndefined(stored));
}
export async function subscribeUserProfile(
  uid: string,
  onChange: (profile: UserProfile | null) => void,
  onError: (error: Error) => void,
) {
  const db = await database();
  const { onValue, ref } = await import("firebase/database");
  return onValue(
    ref(db, `users/${uid}`),
    (snapshot) =>
      onChange(snapshot.exists() ? fromStored(uid, snapshot.val()) : null),
    onError,
  );
}
export async function getOnboardingDraft(uid: string) {
  const db = await database();
  const { get, ref } = await import("firebase/database");
  const snapshot = await get(ref(db, `users/${uid}/onboardingDraft`));
  return snapshot.exists() ? (snapshot.val() as Record<string, unknown>) : null;
}
export async function setOnboardingDraft(
  uid: string,
  draft: Record<string, unknown>,
) {
  const db = await database();
  const { ref, set } = await import("firebase/database");
  await set(ref(db, `users/${uid}/onboardingDraft`), withoutUndefined(draft));
}
export async function subscribeAllUsers(
  onChange: (users: UserProfile[]) => void,
  onError: (error: Error) => void,
) {
  const db = await database();
  const { onValue, ref } = await import("firebase/database");
  return onValue(
    ref(db, "users"),
    (snapshot) => {
      const value = snapshot.val() as Record<string, unknown> | null;
      onChange(
        Object.entries(value ?? {})
          .map(([uid, node]) => fromStored(uid, node))
          .filter((profile): profile is UserProfile => profile !== null),
      );
    },
    onError,
  );
}
export function profileToNearbyDriver(profile: UserProfile): Driver | null {
  if (profile.role !== "driver" || !profile.vehicleType || !profile.vehicle)
    return null;
  return {
    ...profile,
    role: "driver",
    vehicleType: profile.vehicleType,
    vehicle: profile.vehicle,
    etaMinutes: profile.etaMinutes ?? 6,
    fare: profile.fare ?? 300,
    currency: profile.currency ?? "৳",
    distanceKm: profile.distanceKm ?? 1.5,
  };
}
