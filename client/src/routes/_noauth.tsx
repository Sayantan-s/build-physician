import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_noauth")({
  beforeLoad: async ({ context }) => {
    console.log(context, "CTX");
    if (!context.auth.isPending && context.auth.isAuthenticated)
      throw redirect({
        to: "/dashboard",
      });
  },
  onStay: async ({ context }) => {
    console.log(context);
  },
});
