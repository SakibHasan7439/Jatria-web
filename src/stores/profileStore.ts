import { create } from "zustand";
import type { UserProfile } from "../types";
import { updateUserProfile } from "../services/firebase/profiles";

type ProfileState = {
  profiles: UserProfile[];
  isReady: boolean;
  error: string | null;
  initialize: () => Promise<() => void>;
  updateProfile: (id: string, patch: Partial<UserProfile>) => Promise<void>;
};
export const useProfileStore = create<ProfileState>()((set) => ({
  profiles: [],
  isReady: false,
  error: null,
  initialize: async () => {
    let disposed = false;
    set({ isReady: false, error: null });
    try {
      const unsubscribe = await (
        await import("../services/firebase/profiles")
      ).subscribeAllUsers(
        (profiles) => {
          if (!disposed) set({ profiles, isReady: true, error: null });
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
            : "Could not load Jatria profiles.",
      });
      return () => {
        disposed = true;
      };
    }
  },
  updateProfile: async (id, patch) => {
    await updateUserProfile(id, patch);
    set((state) => ({
      profiles: state.profiles.map((profile) =>
        profile.id === id ? { ...profile, ...patch } : profile,
      ),
    }));
  },
}));
