import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import Firebase from "../../../integrations/firebase";
import { useAuthStore } from "../../../store/auth";
import { getSigninMetaData } from "../../http/endpoints/auth";
import { useAuth } from "./useGoogleLogin";

export const useAuthState = () => {
  const { setLogin, setPendingStatus } = useAuthStore();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Firebase.auth.onAuthStateChanged(async (user) => {
      setPendingStatus(true);
      try {
        if (user) {
          const signInRes = await getSigninMetaData();
          setLogin(signInRes.data.data);
          navigate({ to: "/dashboard" });
          if (signInRes.status === 201) console.log("Signed up!!");
        }
      } catch (error) {
        if (isAxiosError(error)) await signOut();
      } finally {
        setPendingStatus(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
