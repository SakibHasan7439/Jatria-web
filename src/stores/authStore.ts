import { create } from "zustand";
import type { Role, UserProfile, VehicleType } from "../types";
import type { User as FirebaseUser } from "firebase/auth";
import {
  authErrorMessage,
  createEmailAccount,
  firebaseAuthConfigured,
  signInWithEmail,
  signOutFirebase,
  subscribeToAuth,
} from "../services/firebase/auth";
import {
  getUserProfile,
  setUserProfile,
  subscribeUserProfile,
} from "../services/firebase/profiles";

type RegistrationDetails = {
  phone: string;
  licenseNumber?: string;
  vehicleType?: VehicleType;
  vehicle?: UserProfile["vehicle"];
};
type AuthState = {
  user: UserProfile | null;
  isReady: boolean;
  isBusy: boolean;
  error: string | null;
  initialize: () => Promise<() => void>;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  register: (
    name: string,
    email: string,
    password: string,
    role: Role,
    details: RegistrationDetails,
  ) => Promise<UserProfile>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>;
};
let profileUnsubscribe: (() => void) | null = null;
function watchProfile(uid: string, set: (partial: Partial<AuthState>) => void) {
  void subscribeUserProfile(
    uid,
    (profile) => {
      if (profile) set({ user: profile, error: null });
    },
    (error) => set({ error: authErrorMessage(error) }),
  )
    .then((unsubscribe) => {
      profileUnsubscribe?.();
      profileUnsubscribe = unsubscribe;
    })
    .catch((error: unknown) => set({ error: authErrorMessage(error) }));
}
export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isReady: false,
  isBusy: false,
  error: null,
  initialize: async () => {
    let disposed = false;
    set({ isReady: false, error: null });
    if (!firebaseAuthConfigured()) {
      set({
        isReady: true,
        error:
          "Firebase is not configured. Set the VITE_FIREBASE values in .env.local.",
      });
      return () => {
        disposed = true;
      };
    }
    try {
      const unsubscribe = await subscribeToAuth(
        async (authUser) => {
          profileUnsubscribe?.();
          profileUnsubscribe = null;
          if (disposed) return;
          if (!authUser) {
            set({ user: null, isReady: true, isBusy: false, error: null });
            return;
          }
          set({ isReady: false, error: null });
          try {
            const profile = await getUserProfile(authUser.uid);
            if (disposed) return;
            if (profile) {
              set({ user: profile, isReady: true, error: null });
              watchProfile(authUser.uid, set);
            } else {
              set({
                user: null,
                isReady: true,
                error:
                  "This Firebase account needs its Jatria profile completed.",
              });
              watchProfile(authUser.uid, set);
            }
          } catch (error) {
            if (!disposed)
              set({
                user: null,
                isReady: true,
                error: authErrorMessage(error),
              });
          }
        },
        (error) => {
          if (!disposed) set({ isReady: true, error: authErrorMessage(error) });
        },
      );
      return () => {
        disposed = true;
        profileUnsubscribe?.();
        profileUnsubscribe = null;
        unsubscribe();
      };
    } catch (error) {
      set({ isReady: true, error: authErrorMessage(error) });
      return () => {
        disposed = true;
      };
    }
  },
  signIn: async (email, password) => {
    set({ isBusy: true, error: null });
    try {
      const authUser = await signInWithEmail(email.trim(), password);
      const profile = await getUserProfile(authUser.uid);
      if (!profile)
        throw new Error(
          "Your Firebase account does not have a complete Jatria profile. Contact support or finish onboarding in the mobile app.",
        );
      set({ user: profile, error: null, isReady: true });
      watchProfile(authUser.uid, set);
      return profile;
    } catch (error) {
      const message = authErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isBusy: false });
    }
  },
  register: async (name, email, password, role, details) => {
    set({ isBusy: true, error: null });
    try {
      const normalizedEmail = email.trim().toLowerCase();
      let authUser: FirebaseUser;
      try {
        authUser = await createEmailAccount(
          normalizedEmail,
          password,
          name.trim(),
        );
      } catch (error) {
        if ((error as { code?: string })?.code !== "auth/email-already-in-use")
          throw error;
        authUser = await signInWithEmail(normalizedEmail, password);
        const existingProfile = await getUserProfile(authUser.uid);
        if (existingProfile)
          throw new Error(
            "That email already has a Jatria account. Sign in instead.",
          );
      }
      const profile: UserProfile = {
        id: authUser.uid,
        fullName: name.trim(),
        email: authUser.email ?? normalizedEmail,
        phone: details.phone.trim(),
        role,
        joinedAt: new Date().toISOString(),
        memberSince: new Date().toISOString().slice(0, 7),
        rating: 5,
        trips: 0,
        bio: "",
        onboardingComplete: true,
        licenseNumber: details.licenseNumber,
        vehicleType: details.vehicleType,
        vehicle: details.vehicle,
      };
      await setUserProfile(profile);
      set({ user: profile, error: null, isReady: true });
      watchProfile(authUser.uid, set);
      return profile;
    } catch (error) {
      const message = authErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isBusy: false });
    }
  },
  signOut: async () => {
    set({ isBusy: true, error: null });
    try {
      await signOutFirebase();
      profileUnsubscribe?.();
      profileUnsubscribe = null;
      set({ user: null, error: null });
    } catch (error) {
      const message = authErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isBusy: false });
    }
  },
  updateProfile: async (patch) => {
    const user = get().user;
    if (!user) throw new Error("Sign in to update your profile.");
    try {
      const { updateUserProfile } =
        await import("../services/firebase/profiles");
      await updateUserProfile(user.id, patch);
      set({ user: { ...user, ...patch }, error: null });
    } catch (error) {
      const message = authErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    }
  },
}));
