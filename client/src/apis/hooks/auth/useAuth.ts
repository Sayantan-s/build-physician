import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import Firebase from "../../../integrations/firebase";
import { useAuthStore, useRootAuthState } from "../../../store/auth";
import { getSigninMetaData } from "../../http/endpoints/auth";
import { useEffect } from "react";

export const GOOGLE_LOGIN = "GOOGLE_LOGIN_Q_KEY" as const;
export const SIGN_OUT = "SIGN_OUT_Q_KEY" as const;
export const AUTHORIZE = "AUTHORIZE_Q_KEY" as const;
export const FIREAUTH = "FIREAUTH_Q_KEY" as const;

const useSignIn = () => {
  const { isPending, setPendingStatus } = useAuthStore();
  const { mutate: signOut } = useSignOut();
  return useMutation({
    mutationKey: [GOOGLE_LOGIN],
    mutationFn: async () => {
      await signInWithPopup(Firebase.auth, new GoogleAuthProvider());
    },
    onError: async () => await signOut(),
    onSettled: async () => {
      if (isPending) setPendingStatus(false);
    },
  });
};

const useSignOut = () => {
  const router = useRouter();
  const { setLogout } = useAuthStore();
  return useMutation({
    mutationKey: [SIGN_OUT],
    mutationFn: async () => {
      await Firebase.auth.signOut();
    },
    onError: async () => {
      setLogout();
    },
    onSuccess: async () => {
      setLogout();
      router.navigate({
        to: "/signin",
        search: {
          redirect: window.location.href,
        },
      });
    },
  });
};

const useAuthorize = () => {
  const router = useRouter();
  const { setLogin, isPending, setPendingStatus } = useAuthStore();
  const { mutate: signOut } = useSignOut();

  return useMutation({
    mutationKey: [AUTHORIZE],
    mutationFn: async (user: User | null) => {
      setPendingStatus(true);
      if (user) return await getSigninMetaData();
      else throw "User not found!";
    },
    onError: async () => await signOut(),
    onSuccess: async (res) => {
      setLogin(res.data.data);
      router.navigate({ to: "/dashboard" });
      if (res.status === 201) console.log("Signed up!!");
    },
    onSettled: async () => {
      if (isPending) setPendingStatus(false);
    },
  });
};

const useAuthStateChange = () => {
  const { setPendingStatus } = useAuthStore();
  const { mutate: authorize } = useAuthorize();
  return useMutation({
    mutationKey: [FIREAUTH],
    mutationFn: async () => {
      return Firebase.auth.onAuthStateChanged(async (user) => {
        console.log(user, "USER");
        setPendingStatus(true);
        await authorize(user);
      });
    },
  });
};

const useAuth = () => {
  const { mutate: firebaseAuth, data: unsubscribe } = useAuthStateChange();

  useEffect(() => {
    firebaseAuth();
    return () => {
      unsubscribe?.();
    };
  }, []);
};

export const authApi = {
  useSignIn,
  useSignOut,
  useAuthorize,
  useAuthStateChange,
  useAuth,
};
