import {
  IMeetingNodeInfo,
  TMeetingInfoNode,
} from "@components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo/types";
import { Edge, OnNodesChange, OnEdgesChange, OnConnect } from "@xyflow/react";

export type BuilderToolNode = TMeetingInfoNode;
export interface BuilderToolState {
  nodes: BuilderToolNode[];
  edges: Edge[];
  nodeIndexes: Record<string, number>;
}

export interface BuilderToolAction {
  onNodesChange: OnNodesChange<BuilderToolNode>;
  onNodeDataChange: (nodeId: string, changes: IMeetingNodeInfo) => void;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: BuilderToolNode[]) => void;
  setEdges: (edges: Edge[]) => void;
}
