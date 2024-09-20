import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "./types";
import { immer } from "zustand/middleware/immer";

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

export const useRootAuthState = create<IAuthState & IAuthAction>()(
  devtools(
    immer((set) => ({
      isPending: true,
      isAuthenticated: false,
      user: null,
      setPendingStatus: (pendingStatus) =>
        set((state) => {
          state.isPending = pendingStatus;
        }),
      setLogin: (user: IUser) =>
        set((state) => {
          state.isAuthenticated = true;
          state.user = user;
        }),
      setLogout: () =>
        set((state) => {
          state.isAuthenticated = false;
          state.user = null;
        }),
    }))
  )
);

export const useAuthStore = () => useRootAuthState((state) => state);
