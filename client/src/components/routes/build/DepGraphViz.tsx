import { useFocusRootNode } from "@hooks/useFocusRootNode";
import { useDepGraphToolStore } from "@store/build";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export const DepGraphViz = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useDepGraphToolStore();

  useFocusRootNode();

  return (
    <div className="h-[50rem] flex-[0.5]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
