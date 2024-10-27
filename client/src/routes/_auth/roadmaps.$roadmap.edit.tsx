import { RoadMapBuilder } from "@components/stories/organisms/RoadmapBuilder";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/roadmaps/$roadmap/edit")({
  component: Roadmap,
});

function Roadmap() {
  return <RoadMapBuilder />;
}
