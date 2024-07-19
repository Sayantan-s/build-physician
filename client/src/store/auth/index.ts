import { User } from "firebase/auth";
import { create } from "zustand";

interface State {
  isAuthenticated: boolean;
  user: User | null;
  isPending: boolean;
}

interface Action {
  setLogin: (payload: User) => void;
  setPendingStatus: (pendingStatus: boolean) => void;
}

const useRootState = create<State & Action>((set) => ({
  isPending: false,
  isAuthenticated: false,
  user: null,
  setPendingStatus: (pendingStatus) =>
    set(() => ({ isPending: pendingStatus })),
  setLogin: (user: User) => set(() => ({ isAuthenticated: true, user })),
  setLogout: () => set(() => ({ isAuthenticated: false, user: null })),
}));

export const useAuth = () => useRootState((state) => state);
