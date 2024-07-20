import { create } from "zustand";
import { IUser } from "./types";

interface State {
  isAuthenticated: boolean;
  user: IUser | null;
  isPending: boolean;
}

interface Action {
  setLogin: (payload: IUser) => void;
  setPendingStatus: (pendingStatus: boolean) => void;
}

const useRootState = create<State & Action>((set) => ({
  isPending: false,
  isAuthenticated: false,
  user: null,
  setPendingStatus: (pendingStatus) =>
    set(() => ({ isPending: pendingStatus })),
  setLogin: (user: IUser) => set(() => ({ isAuthenticated: true, user })),
  setLogout: () => set(() => ({ isAuthenticated: false, user: null })),
}));

export const useAuthStore = () => useRootState((state) => state);
