import { useDepGraphToolRootState } from "@store/build";
import { Node, useReactFlow } from "@xyflow/react";
import { useLayoutEffect, useRef } from "react";

export const useFocusRootNode = () => {
  const reactFlowInstance = useReactFlow();
  const isFocused = useRef(false);
  const rootNode = useDepGraphToolRootState((state) =>
    state.nodes.find((node) => node.data.isRoot)
  );

  useLayoutEffect(
    function focusRootNode() {
      if (rootNode && rootNode.measured && !isFocused.current) {
        reactFlowInstance.setCenter(rootNode.position.x, rootNode.position.y, {
          zoom: 0.7,
        });
        isFocused.current = true;
      }
    },
    [rootNode, isFocused]
  );
};
