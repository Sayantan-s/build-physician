import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { useAuthStore } from "../store/auth";
import { Auth } from "../components/utils/Auth";

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
  return (
    <Auth>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Auth>
  );
}
