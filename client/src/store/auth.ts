import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { create } from "zustand";
import Firebase from "../integrations/firebase";

interface State {
  refreshToken: string;
}

interface Action {
  googleLogin: () => Promise<void>;
}

const useRootState = create<State & Action>((set) => ({
  refreshToken: "",
  googleLogin: async () => {
    const res = await signInWithPopup(Firebase.auth, new GoogleAuthProvider());
    set(() => ({ refreshToken: res.user.refreshToken }));
  },
}));

export const useAuth = () => useRootState((state) => state);
