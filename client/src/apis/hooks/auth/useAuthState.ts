import { useEffect } from "react";
import Firebase from "../../../integrations/firebase";
import { useAuthStore } from "../../../store/auth";
import { useAuth } from "./useGoogleLogin";

export const useAuthInit = () => {
  const { setPendingStatus } = useAuthStore();
  const { signOut, authorize } = useAuth();

  useEffect(() => {
    const unsubscribe = Firebase.auth.onAuthStateChanged(async (user) => {
      console.log(user, "USER");
      setPendingStatus(true);
      try {
        if (user) await authorize();
        else throw "User not found!";
      } catch (error) {
        await signOut();
      } finally {
        setPendingStatus(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
