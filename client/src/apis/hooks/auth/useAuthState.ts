import { useEffect, useState } from "react";
import Firebase from "../../../integrations/firebase";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = Firebase.auth.onAuthStateChanged(async (user) => {
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return { isLoading };
};
