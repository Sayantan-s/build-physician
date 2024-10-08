import { Link, createFileRoute } from "@tanstack/react-router";
import { authApi } from "@apis/hooks/auth";

export const Route = createFileRoute("/_auth/_layout/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <Link to="/roadmaps">Roadmaps</Link>
    </div>
  );
}
