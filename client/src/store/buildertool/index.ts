import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import { AppState } from "./types";
import { INITIAL_NODES } from "./nodes";
import { INITIAL_EDGES } from "./edges";
import { useShallow } from "zustand/react/shallow";

const useBuilderRootToolState = create<AppState>((set, get) => ({
  nodes: INITIAL_NODES,
  edges: INITIAL_EDGES,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
}));

export const useBuilderToolStore = () =>
  useBuilderRootToolState(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
    }))
  );
