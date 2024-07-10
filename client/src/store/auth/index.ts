import { create } from "zustand";

interface State {
  refreshToken: string;
}

interface Action {
  setAuthData: () => void;
}

const useRootState = create<State & Action>((set) => ({
  refreshToken: "",
  setAuthData: () => {},
}));

export const useAuth = () => useRootState((state) => state);
