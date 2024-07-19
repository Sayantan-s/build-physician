import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from "../../../integrations/firebase";
import { api } from "../../http";
import { SIGNIN } from "../../http/endpoints/auth";

export const GOOGLE_LOGIN = "GOOGLE_LOGIN_Q_KEY" as const;

export const useAuth = () => {
  const queryClient = useQueryClient();
  return {
    signIn: () =>
      queryClient.ensureQueryData({
        queryKey: [GOOGLE_LOGIN],
        queryFn: async () => {
          try {
            await signInWithPopup(Firebase.auth, new GoogleAuthProvider());
            const signInRes = await api.get(SIGNIN);
            if (signInRes.status === 200) console.log("Logged in!!");
            if (signInRes.status === 201) console.log("Signed up!!");
          } catch (error) {
            if (isAxiosError(error)) {
              await Firebase.auth.signOut();
            }
          }
        },
      }),
    signOut: async () => {
      await Firebase.auth.signOut();
    },
  };
};
