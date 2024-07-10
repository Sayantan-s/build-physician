import { useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from "../integrations/firebase";

export const GOOGLE_LOGIN_Q_KEY = "GOOGLE_LOGIN_Q_KEY" as const;

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.ensureQueryData({
      queryKey: [GOOGLE_LOGIN_Q_KEY],
      queryFn: async () => {
        const res = await signInWithPopup(
          Firebase.auth,
          new GoogleAuthProvider()
        );
        const token = await res.user.getIdToken();
        console.log(token);
      },
    });
};
