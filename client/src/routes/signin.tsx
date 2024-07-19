import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: Login,
});

function Login() {
  return <div>Login</div>;
}
