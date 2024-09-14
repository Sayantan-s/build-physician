import {
  ReactFlow,
  Controls,
  Background,
  OnNodesChange,
  applyNodeChanges,
  Node,
  applyEdgeChanges,
  OnEdgesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useBuilderToolStore } from "../store/buildertool";
import { NODE_TYPES } from "../store/buildertool/nodes";

export const RoadMapBuilder = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useBuilderToolStore();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={NODE_TYPES}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
