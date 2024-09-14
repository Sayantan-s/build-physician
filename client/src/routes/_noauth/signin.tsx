import { createFileRoute } from "@tanstack/react-router";
import { authApi } from "../../apis/hooks/auth";

export const Route = createFileRoute("/_noauth/signin")({
  component: SignIn,
});

function SignIn() {
  const { mutate: signIn, isPending } = authApi.useSignIn();

  const handleSignIn = async () => await signIn();

  return (
    <div>
      <button onClick={handleSignIn} disabled={isPending}>
        {isPending ? "..." : "Google Login"}
      </button>
    </div>
  );
}
