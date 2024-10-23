import { ReactFlow, Controls, Background, ControlButton } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useBuilderToolStore } from "@store/buildertool";
import { NODE_TYPES } from "@store/buildertool/nodes";
import { RoadMapControls } from "./Controls/RoadMapControls";

export const RoadMapBuilder = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useBuilderToolStore();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <RoadMapControls />
      </ReactFlow>
    </div>
  );
};
