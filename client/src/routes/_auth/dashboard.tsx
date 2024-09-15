import { createFileRoute } from "@tanstack/react-router";
import { authApi } from "@apis/hooks/auth";
import { RoadMapBuilder } from "@components/stories/organisms/RoadmapBuilder";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { mutate: signOut, isPending } = authApi.useSignOut();

  const handleSignOut = async () => await signOut();

  return (
    <div>
      <button onClick={handleSignOut} disabled={isPending}>
        {isPending ? "loading..." : "Sign out"}
      </button>
      <RoadMapBuilder />
    </div>
  );
}
