import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/roadmaps/$roadmapId")({
  component: () => <div>Hello /_auth/roadmaps/$roadmapId!</div>,
});
