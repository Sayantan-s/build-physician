import {
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Node,
} from "@xyflow/react";
import { WritableDraft } from "immer";

export interface IBuild {
  _id: any;
  depGraphMetrics: DepGraphMetrics;
  resultMetrics: ResultMetrics;
  buildId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepGraphMetrics {
  nodes: INode[];
  edges: IEdge[];
}

export interface INode {
  id: string;
  name: string;
  size: number;
  position?: { x: number; y: number };
  isRoot: boolean;
}

export interface IEdge {
  source?: string;
  target: string;
}

export interface ResultMetrics {
  buildTime: string;
  bundleSize: number;
  hmrTime: string;
  plugins: Plugin[];
}

export interface Plugin {
  name: string;
  time: string;
  type: string;
  extension: string;
  size: number;
}

// Dep graph Viz State

export interface IDepGraphToolState {
  nodes: Node[];
  edges: Edge[];
}

export interface IDepGraphToolAction {
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setDepGraphNodes: (node: INode[]) => void;
  setDepGraphEdges: (node: IEdge[]) => void;
  setDepGraph: (nodes: INode[], edges: IEdge[]) => void;
}

export type IDepGraphToolSetter = (
  nextStateOrUpdater:
    | (IDepGraphToolState & IDepGraphToolAction)
    | Partial<IDepGraphToolState & IDepGraphToolAction>
    | ((state: WritableDraft<IDepGraphToolState & IDepGraphToolAction>) => void)
) => void;

export type IDepGraphToolGetter = () => IDepGraphToolState &
  IDepGraphToolAction;
