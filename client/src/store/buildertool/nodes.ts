import { MeetingInfo } from "../../components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo";
import { AppNode } from "./types";

export const INITIAL_NODES: AppNode[] = [
  {
    id: "4",
    type: "meetinInfo",
    data: { meetingName: "", meetingDescription: "" },
    position: { x: 250, y: 250 },
  },
];

export const NODE_TYPES = { meetinInfo: MeetingInfo };
