import { authApi } from "@apis/hooks";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout")({
  component: AuthLayout,
});

function AuthLayout() {
  const { mutate: signOut, isPending } = authApi.useSignOut();

  const handleSignOut = async () => await signOut();

  return (
    <div>
      <button onClick={handleSignOut} disabled={isPending}>
        {isPending ? "loading..." : "Sign out"}
      </button>
      <Outlet />
    </div>
  );
}
