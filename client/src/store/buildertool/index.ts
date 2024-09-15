import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import { BuilderToolAction, BuilderToolState } from "./types";
import { INITIAL_NODES, NODE_INDEXES } from "./nodes";
import { INITIAL_EDGES } from "./edges";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";

const useBuilderRootToolState = create<BuilderToolState & BuilderToolAction>()(
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
  }))
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
    }))
  );
