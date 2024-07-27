import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../apis/hooks/auth";

export const Route = createFileRoute("/_noauth/signin")({
  component: SignIn,
});

function SignIn() {
  const { signIn } = useAuth();

  return (
    <div>
      <button onClick={signIn}>Google Login</button>
    </div>
  );
}
