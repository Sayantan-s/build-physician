import { create } from "zustand";
import { IUser } from "./types";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isPending: boolean;
}

export interface IAuthAction {
  setLogin: (payload: IUser) => void;
  setPendingStatus: (pendingStatus: boolean) => void;
  setLogout: () => void;
}

const useRootState = create<IAuthState & IAuthAction>((set) => ({
  isPending: false,
  isAuthenticated: false,
  user: null,
  setPendingStatus: (pendingStatus) =>
    set(() => ({ isPending: pendingStatus })),
  setLogin: (user: IUser) => set(() => ({ isAuthenticated: true, user })),
  setLogout: () => set(() => ({ isAuthenticated: false, user: null })),
}));

export const useAuthStore = () => useRootState((state) => state);
