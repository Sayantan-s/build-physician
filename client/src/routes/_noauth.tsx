import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_noauth")({
  beforeLoad: async ({ context }) => {
    console.log("_NOAUTH");
    if (!context.auth.isPending && context.auth.isAuthenticated)
      throw redirect({
        to: "/dashboard",
      });
  },
});
