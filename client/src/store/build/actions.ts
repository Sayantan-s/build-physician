import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import {
  IDepGraphToolAction,
  IDepGraphToolGetter,
  IDepGraphToolSetter,
} from "./types";
import dagre from "@dagrejs/dagre";

export const depGraphToolActions = (
  set: IDepGraphToolSetter,
  get: IDepGraphToolGetter
): IDepGraphToolAction => ({
  onNodesChange: (changes) => {
    set((state) => {
      state.nodes = applyNodeChanges(changes, get().nodes);
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

  setDepGraph: (nodes, edges) => {
    const _NODE_WIDTH = 200;
    const _NODE_HEIGHT = 200;

    const updatedEdges = edges
      .map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target.toString(),
      }))
      .filter((edge) => edge.source);

    const dagreGraph = new dagre.graphlib.Graph();

    dagreGraph.setGraph({
      rankdir: "TB",
      nodesep: 100,
      edgesep: 70, // Space between edges
      ranksep: 100, // Increase for more vertical spacing
      marginx: 20,
      marginy: 20,
    });

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    nodes.forEach(
      (node) =>
        node.id.trim() !== "" &&
        dagreGraph.setNode(node.id, {
          width: _NODE_WIDTH,
          height: _NODE_HEIGHT,
        })
    );

    updatedEdges.forEach((edge) => {
      const source = edge.source;
      if (
        !source ||
        !dagreGraph.hasNode(source) ||
        !dagreGraph.hasNode(edge.target)
      ) {
        console.error("Edge contains undefined node:", edge);
      } else {
        dagreGraph.setEdge(source, edge.target);
      }
    });

    dagre.layout(dagreGraph);

    const updatedNodes = nodes.map((node) => {
      const layoutNode = dagreGraph.node(node.id);
      return {
        id: node.id,
        data: { label: node.name, isRoot: node.isRoot },
        position: layoutNode
          ? { x: layoutNode.x, y: layoutNode.y }
          : { x: 0, y: 0 },
        width: _NODE_WIDTH,
        height: _NODE_HEIGHT,
      };
    });

    set((state) => {
      state.edges = updatedEdges.map((edge) => ({
        ...edge,
        source: edge.source || "",
        style: { stroke: "red" },
      }));
      state.nodes = updatedNodes;
    });
  },

  setDepGraphEdges: (edges) => {
    set((state) => {
      state.edges = edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source || "",
        target: edge.target.toString(),
        type: "step",
      }));
    });
  },

  setDepGraphNodes: (nodes) => {
    set((state) => {
      state.nodes = nodes.map((node) => ({
        id: node.id,
        data: { label: node.name },
        position: { x: node.position?.x || 0, y: node.position?.y || 0 },
        width: 200,
        height: 200,
      }));
    });
  },
});
