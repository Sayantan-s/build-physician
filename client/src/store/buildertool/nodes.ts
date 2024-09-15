import { MeetingInfo } from "@components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo";
import { BuilderToolNode } from "./types";
import { v4 as uuid } from "uuid";
import { FC } from "react";

const nodeIdCreator = <T>(node: FC<T>) => `${uuid()}__${node.displayName}`;

export const [NODE_1_ID, NODE_2_ID] = [
  nodeIdCreator(MeetingInfo),
  nodeIdCreator(MeetingInfo),
];

export const INITIAL_NODES: BuilderToolNode[] = [
  {
    id: NODE_1_ID,
    type: MeetingInfo.displayName,
    data: { meetingName: "", meetingDescription: "" },
    position: { x: 250, y: 250 },
  },
  {
    id: NODE_2_ID,
    type: MeetingInfo.displayName,
    data: { meetingName: "", meetingDescription: "" },
    position: { x: 0, y: 350 },
  },
];

export const NODE_INDEXES = {
  [NODE_1_ID]: 0,
  [NODE_2_ID]: 1,
};

export const NODE_TYPES = { [MeetingInfo.displayName!]: MeetingInfo };
