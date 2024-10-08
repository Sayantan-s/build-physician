import {
  createRouteMask,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { queryClient } from "@integrations/network";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "@store/auth";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const authState = useAuthStore();
  return <RouterProvider router={router} context={{ auth: authState }} />;
};
