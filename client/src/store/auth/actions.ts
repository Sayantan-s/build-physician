import { IAuthAction, IAuthStateSetterType } from "./types";

export const authActions = (set: IAuthStateSetterType): IAuthAction => ({
  setPendingStatus: (pendingStatus) =>
    set((state) => {
      state.isPending = pendingStatus;
    }),
  setLogin: (user) =>
    set((state) => {
      state.isAuthenticated = true;
      state.user = user;
    }),
  setLogout: () =>
    set((state) => {
      state.isAuthenticated = false;
      state.user = null;
    }),
});
