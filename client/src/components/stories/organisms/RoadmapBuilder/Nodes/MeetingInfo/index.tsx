import { Handle, NodeProps, Position } from "@xyflow/react";
import React, { FC, FormEventHandler } from "react";
import { IMeetingNodeInfo, TMeetingInfoNode } from "./types";
import { FieldApi, useForm } from "@tanstack/react-form";
import { MeetingRoadmapNode } from "./styles";
import { useBuilderToolStore } from "@store/buildertool";

export const MeetingInfo: FC<NodeProps<TMeetingInfoNode>> = ({ data, id }) => {
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
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      field.handleChange(e.target.value);
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
              />
            )}
          />
          <form.Field
            name="meetingDescription"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange(field)}
              />
            )}
          />
          <button type="submit">Save</button>
        </form>
      </MeetingRoadmapNode>
      <Handle type="source" position={Position.Bottom} id="a" />
    </React.Fragment>
  );
};

MeetingInfo.displayName = "meetingInfo";
