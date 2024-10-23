import { MeetingInfo } from "@components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo";
import { BuilderToolNode } from "./types";
import { v4 as uuid } from "uuid";
import { FC } from "react";
import { Edge, Node, ReactFlowInstance, XYPosition } from "@xyflow/react";

export class NodeController {
  static nodeIdCreator = <T>(node: FC<T>) => `${uuid()}__${node.displayName}`;
  static getRandomNodePosition(
    reactFlowInstance: ReactFlowInstance<Node, Edge>
  ): XYPosition {
    const {
      x: viewportX,
      y: viewportY,
      zoom,
    } = reactFlowInstance.getViewport();

    const padding = 100; // To ensure the node is not too close to the edge of the viewport
    const viewportWidth = window.innerWidth - padding;
    const viewportHeight = window.innerHeight - padding;

    // Generate random position within the visible viewport
    const randomX = Math.random() * viewportWidth;
    const randomY = Math.random() * viewportHeight;

    // Adjust for pan and zoom
    const position = {
      x: (randomX - viewportX) / zoom,
      y: (randomY - viewportY) / zoom,
    };

    return position;
  }
}

export const [NODE_1_ID, NODE_2_ID] = [
  MeetingInfo.createNodeId(),
  MeetingInfo.createNodeId(),
];

export const INITIAL_NODES: BuilderToolNode[] = [];

export const NODE_INDEXES: Record<string, number> = {};

export const NODE_TYPES = { [MeetingInfo.displayName!]: MeetingInfo };
