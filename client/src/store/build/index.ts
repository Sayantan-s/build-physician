import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IDepGraphToolAction, IDepGraphToolState } from "./types";
import { depGraphToolState } from "./state";
import { depGraphToolActions } from "./actions";
import { useShallow } from "zustand/react/shallow";

export const useDepGraphToolRootState = create<
  IDepGraphToolState & IDepGraphToolAction
>()(
  devtools(
    immer((set, get) => ({
      ...depGraphToolState,
      ...depGraphToolActions(set, get),
    })),
    {
      serialize: true,
    }
  )
);

export const depGraphToolRootState = useDepGraphToolRootState.getState();
export const useDepGraphToolStore = () =>
  useDepGraphToolRootState(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      setEdges: state.setEdges,
      setNodes: state.setNodes,
      setDepGraphNodes: state.setDepGraphNodes,
      setDepGraphEdges: state.setDepGraphEdges,
      setDepGraph: state.setDepGraph,
    }))
  );
