import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../apis/hooks/auth";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
}
