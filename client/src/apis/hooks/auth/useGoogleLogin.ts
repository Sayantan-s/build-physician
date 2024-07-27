import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from "../../../integrations/firebase";
import { useAuthStore } from "../../../store/auth";
import { getSigninMetaData } from "../../http/endpoints/auth";

export const GOOGLE_LOGIN = "GOOGLE_LOGIN_Q_KEY" as const;

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setLogout, setLogin } = useAuthStore();
  const router = useRouter();
  return {
    signIn: () =>
      queryClient.ensureQueryData({
        queryKey: [GOOGLE_LOGIN],
        queryFn: async () => {
          try {
            await signInWithPopup(Firebase.auth, new GoogleAuthProvider());
          } catch (error) {
            await Firebase.auth.signOut();
          }
        },
      }),
    signOut: async () => {
      await Firebase.auth.signOut();
      setLogout();
      router.navigate({
        to: "/signin",
        search: {
          redirect: window.location.href,
        },
      });
    },
    authorize: async () => {
      const signInRes = await getSigninMetaData();
      setLogin(signInRes.data.data);
      router.navigate({ to: "/dashboard" });
      if (signInRes.status === 201) console.log("Signed up!!");
    },
  };
};
