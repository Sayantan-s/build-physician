import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IAuthAction, IAuthState } from "./types";
import { immer } from "zustand/middleware/immer";
import { authState } from "./state";
import { authActions } from "./actions";

const useRootAuthState = create<IAuthState & IAuthAction>()(
  devtools(
    immer((set) => ({
      ...authState,
      ...authActions(set),
    }))
  )
);

export const authRootState = useRootAuthState.getState();
export const useAuthStore = () => useRootAuthState((state) => state);
