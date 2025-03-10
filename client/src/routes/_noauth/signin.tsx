import { authApi } from "@apis/hooks";

export function SignIn() {
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
