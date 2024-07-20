import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import Firebase from "../../../integrations/firebase";
import { useAuthStore } from "../../../store/auth";
import { getSigninMetaData } from "../../http/endpoints/auth";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setLogin, setPendingStatus } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = Firebase.auth.onAuthStateChanged(async (user) => {
      setPendingStatus(true);
      try {
        if (user) {
          const signInRes = await getSigninMetaData();
          if (signInRes.status === 200) console.log("Logged in!!");
          if (signInRes.status === 201) console.log("Signed up!!");
          setLogin(signInRes.data.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          await Firebase.auth.signOut();
        }
      } finally {
        setPendingStatus(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return { isLoading };
};
