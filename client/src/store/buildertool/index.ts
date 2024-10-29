import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
  Node,
  Edge,
  ReactFlowInstance,
} from "@xyflow/react";

import { BuilderToolAction, BuilderToolState } from "./types";
import { INITIAL_NODES, NODE_INDEXES, NodeController } from "./nodes";
import { INITIAL_EDGES } from "./edges";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { MeetingInfo } from "@components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo";

const useBuilderRootToolState = create<BuilderToolState & BuilderToolAction>()(
  devtools(
    immer((set, get) => ({
      nodes: INITIAL_NODES,
      edges: INITIAL_EDGES,
      nodeIndexes: NODE_INDEXES,

      onNodesChange: (changes) => {
        set((state) => {
          state.nodes = applyNodeChanges(changes, get().nodes);
        });
      },

      onNodeDataChange: (nodeId, changes) => {
        const nodeIndex = get().nodeIndexes[nodeId];
        set((state) => {
          state.nodes[nodeIndex].data = changes;
        });
      },

      onEdgesChange: (changes) => {
        set((state) => {
          state.edges = applyEdgeChanges(changes, get().edges);
        });
      },

      onConnect: (connection) => {
        set((state) => {
          state.edges = addEdge(connection, get().edges);
        });
      },

      setNodes: (nodes) => {
        set((state) => {
          state.nodes = nodes;
        });
      },

      setEdges: (edges) => {
        set((state) => {
          state.edges = edges;
        });
      },

      addNewNode: (reactFlowInstance: ReactFlowInstance<Node, Edge>) => {
        const nodePosition =
          NodeController.getRandomNodePosition(reactFlowInstance);
        const newNode = MeetingInfo.createNode(nodePosition);
        set((state) => {
          state.nodes.push(newNode);
          state.nodeIndexes[newNode.id] = state.nodes.length;
        });
      },

      addChildNode: (parentNode: Node, position: XYPosition) => {
        const newNode = MeetingInfo.createChildNode(parentNode.id, position);
        const newEdge = {
          id: "",
          source: parentNode.id,
          target: newNode.id,
        };
      },
    })),
    {
      serialize: true,
    }
  )
);

export const useBuilderToolStore = () =>
  useBuilderRootToolState(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onNodeDataChange: state.onNodeDataChange,
      addNewNode: state.addNewNode,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );
