import {
  ReactFlow,
  Controls,
  Background,
  ControlButton,
  OnNodesChange,
  OnEdgesChange,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useBuilderToolStore } from "@store/buildertool";
import { NODE_TYPES } from "@store/buildertool/nodes";
import { RoadMapControls } from "./Controls/RoadMapControls";
import { roadmapApi } from "@apis/hooks";
import { useParams } from "@tanstack/react-router";
import { TMeetingInfoNode } from "./Nodes/MeetingInfo/types";

export const RoadMapBuilder = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useBuilderToolStore();

  const { roadmap } = useParams({ from: "/_auth/roadmaps/$roadmap/edit" });

  roadmapApi.useFetchRoadmap(roadmap, {
    addToState: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate: updateRoadmap } = roadmapApi.useUpdateRoadmap(roadmap);

  const handleNodesChange: OnNodesChange<TMeetingInfoNode> = async (
    changes
  ) => {
    onNodesChange(changes);
    console.log(changes);
    // await updateRoadmap();
  };

  const handleEdgesChange: OnEdgesChange<Edge> = (changes) => {
    onEdgesChange(changes);
    console.log(changes);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        {/* <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          kjshfjshdjshf
        </div> */}
        <RoadMapControls />
      </ReactFlow>
    </div>
  );
};
