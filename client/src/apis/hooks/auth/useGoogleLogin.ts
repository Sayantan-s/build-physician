import { useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from "../../../integrations/firebase";
import { api } from "../../http";
import { SIGNIN } from "../../http/endpoints/auth";

export const GOOGLE_LOGIN = "GOOGLE_LOGIN_Q_KEY" as const;

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.ensureQueryData({
      queryKey: [GOOGLE_LOGIN],
      queryFn: async () => {
        const res = await signInWithPopup(
          Firebase.auth,
          new GoogleAuthProvider()
        );
        const token = await res.user.getIdToken();
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const signInRes = await api.get(SIGNIN);
        if (signInRes.status === 200) console.log("Logged in!!");
        if (signInRes.status === 201) console.log("Signed up!!");
      },
    });
};
