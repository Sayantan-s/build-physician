import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React from "react";
import { useAuthInit } from "../apis/hooks/auth";
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
});

function Root() {
  useAuthInit();

  const { isPending } = useAuthStore();

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
