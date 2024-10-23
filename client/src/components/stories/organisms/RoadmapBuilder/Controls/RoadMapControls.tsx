import { useBuilderToolStore } from "@store/buildertool";
import { ControlButton, Controls, useReactFlow } from "@xyflow/react";

export const RoadMapControls = () => {
  const { addNewNode } = useBuilderToolStore();
  const reactFlowInstance = useReactFlow(); // Access React Flow instance

  const handleCreateNode = () => {
    addNewNode(reactFlowInstance);
  };

  return (
    <Controls showZoom={false} showInteractive={true}>
      <ControlButton onClick={handleCreateNode}>+</ControlButton>
    </Controls>
  );
};
