import { Auth } from "@components/utils/Auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isPending && !context.auth.isAuthenticated)
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
  },
  component: AuthWapper,
});

function AuthWapper() {
  return (
    <Auth>
      <Outlet />
    </Auth>
  );
}
