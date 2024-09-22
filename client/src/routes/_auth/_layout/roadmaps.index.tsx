import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/roadmaps/")({
  component: () => (
    <div>
      <button>Yo</button>
    </div>
  ),
});
