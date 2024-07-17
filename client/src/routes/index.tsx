import { createFileRoute } from "@tanstack/react-router";
import { useGoogleLogin } from "../apis/hooks/auth";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const googleLogin = useGoogleLogin();

  return (
    <div>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
}
