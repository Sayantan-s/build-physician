import { createFileRoute } from "@tanstack/react-router";
import { useAuth, useAuthState } from "../apis/hooks/auth";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { signIn, signOut } = useAuth();

  useAuthState();

  return (
    <div>
      <button onClick={signIn}>Google Login</button>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
}
