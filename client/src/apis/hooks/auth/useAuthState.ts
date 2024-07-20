import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import Firebase from "../../../integrations/firebase";

const loadUser = () =>
  new Promise<User | null>((resolve, reject) =>
    Firebase.auth.onAuthStateChanged((user) =>
      user ? resolve(user) : reject()
    )
  );

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = Firebase.auth.onAuthStateChanged(
      async (user) => {
        setIsLoading(false);
        console.log(user);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("compeleted...");
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return { isLoading };
};
