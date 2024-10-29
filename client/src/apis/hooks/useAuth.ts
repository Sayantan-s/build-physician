import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import {
  GoogleAuthProvider,
  User,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import Firebase from "@integrations/firebase";
import { useAuthStore } from "@store/auth";
import { getSigninMetaData } from "@apis/http/endpoints/auth";
import { useEffect, useRef } from "react";
import { isAxiosError } from "axios";

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
      await setPersistence(Firebase.auth, browserSessionPersistence);
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
  const { setLogin, isPending, setPendingStatus } = useAuthStore();
  const { mutate: signOut } = useSignOut();
  const navigate = useNavigate();
  const router = useRouter();
  const location = useLocation();

  return useMutation({
    mutationKey: [AUTHORIZE],
    mutationFn: async (user: User | null) => {
      setPendingStatus(true);
      if (user) return await getSigninMetaData();
      else throw "User not found!";
    },
    retry: (failureCount, error) =>
      isAxiosError(error) && error.status === 500 && failureCount < 2,
    onError: async () => await signOut(),
    onSuccess: async (res) => {
      setLogin(res.data.data!);
      const matchedRoute = router.matchRoutes(location).pop(); // Get the closest matched route
      if (matchedRoute) {
        const exactRoutePath: string | undefined = matchedRoute.id; // Get the route schema id
        const isAuthenticatedValidRoute =
          exactRoutePath && /^\/_auth\//.test(exactRoutePath);
        !isAuthenticatedValidRoute && (await navigate({ to: "/dashboard" }));
        if (res.status === 201) console.log("Signed up!!");
      }
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
      return onAuthStateChanged(Firebase.auth, async (user) => {
        setPendingStatus(true);
        await authorize(user);
      });
    },
  });
};

const useAuth = () => {
  const { mutate: firebaseAuth, data: unsubscribe } = useAuthStateChange();
  const authRef = useRef({ isCalled: false });

  useEffect(() => {
    if (!authRef.current.isCalled) {
      firebaseAuth();
      authRef.current.isCalled = true;
    }
    return () => {
      authRef.current.isCalled && unsubscribe?.();
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
