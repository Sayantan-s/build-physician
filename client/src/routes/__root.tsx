import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { isAxiosError } from "axios";
import React from "react";
import { getSigninMetaData } from "../apis/http/endpoints/auth";
import Firebase from "../integrations/firebase";
import { useAuthStore } from "../store/auth";

interface RouterContext {
  auth: ReturnType<typeof useAuthStore>;
  queryClient: QueryClient;
}

const TanStackRouterDevtools =
  import.meta.env.PUBLIC_ENVIRONMENT === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  beforeLoad: async ({ context }) => {
    Firebase.auth.onAuthStateChanged(async (user) => {
      const { setPendingStatus, setLogout, setLogin } = context.auth;
      setPendingStatus(true);
      try {
        if (user) {
          const signInRes = await getSigninMetaData();
          setLogin(signInRes.data.data);
          redirect({ to: "/dashboard" });
          if (signInRes.status === 201) console.log("Signed up!!");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          Firebase.auth.signOut();
          setLogout();
        }
      } finally {
        setPendingStatus(false);
      }
    });
  },
});

function Root() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
