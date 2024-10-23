import { Handle, NodeProps, Position, XYPosition } from "@xyflow/react";
import React, { FC, FormEventHandler } from "react";
import { IMeetingNodeInfo, TMeetingInfoNode } from "./types";
import { FieldApi, useForm } from "@tanstack/react-form";
import { MeetingRoadmapNode } from "./styles";
import { useBuilderToolStore } from "@store/buildertool";
import { clone } from "es-toolkit";
import { NodeController } from "@store/buildertool/nodes";

const Root: FC<NodeProps<TMeetingInfoNode>> = ({ data, id }) => {
  const { onNodeDataChange } = useBuilderToolStore();

  const form = useForm<IMeetingNodeInfo>({
    defaultValues: data,
    onSubmit: async ({ value }) => {
      onNodeDataChange(id, value);
      form.reset();
    },
  });

  const handleChange = (
    field: FieldApi<IMeetingNodeInfo, any, undefined, undefined, string>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name as keyof IMeetingNodeInfo;
      const values = clone(form.state.values);
      values[name] = e.target.value;
      onNodeDataChange(id, values);
      field.handleChange(e.target.value);
    };
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <React.Fragment>
      <Handle type="target" position={Position.Top} />
      <MeetingRoadmapNode>
        <form onSubmit={handleSubmit}>
          <form.Field
            name="meetingName"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange(field)}
                placeholder="e.g. LifeCycle Builder"
              />
            )}
          />
          <form.Field
            name="meetingDescription"
            children={(field) => (
              <textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange(field)}
                placeholder="e.g. Roadmap tool discussions re...."
              />
            )}
          />
        </form>
      </MeetingRoadmapNode>
      <Handle type="source" position={Position.Bottom} id="a" />
    </React.Fragment>
  );
};

Root.displayName = "meetingInfo";

export const MeetingInfo = Object.assign(Root, {
  createNodeId: () => NodeController.nodeIdCreator(Root),
  createNode: (position: XYPosition) => ({
    id: NodeController.nodeIdCreator(Root),
    type: MeetingInfo.displayName,
    data: { meetingName: "", meetingDescription: "" },
    position,
  }),
  createChildNode: (parentNodeId: string, position: XYPosition) => ({
    id: NodeController.nodeIdCreator(Root),
    type: MeetingInfo.displayName,
    data: { meetingName: "", meetingDescription: "" },
    position,
    parentNode: parentNodeId,
  }),
});
