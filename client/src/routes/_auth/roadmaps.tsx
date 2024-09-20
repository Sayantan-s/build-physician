import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/roadmaps")({
  component: () => (
    <div>
      <Link to="/roadmaps/$roadmap" params={{ roadmap: "123" }}>
        Hello
      </Link>
    </div>
  ),
});
