import { Auth } from "@components/utils/Auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_noauth")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isPending && context.auth.isAuthenticated)
      throw redirect({
        to: "/dashboard",
      });
  },
  component: NoAuthWapper,
});

function NoAuthWapper() {
  return (
    <Auth>
      <Outlet />
    </Auth>
  );
}
