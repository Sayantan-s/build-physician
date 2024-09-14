import { Handle, NodeProps, Position, useNodesData } from "@xyflow/react";
import React, { FC } from "react";
import { IMeetingNodeInfo, TMeetingInfoNode } from "./types";
import { useForm } from "@tanstack/react-form";
import { MeetingRoadmapNode } from "./styles";

export const MeetingInfo: FC<NodeProps<TMeetingInfoNode>> = ({ data, id }) => {
  const form = useForm<IMeetingNodeInfo>({
    defaultValues: data,
    onSubmit: async ({ value }) => {
      console.log(value);
      form.reset();
    },
  });

  return (
    <React.Fragment>
      <Handle type="target" position={Position.Top} />
      <MeetingRoadmapNode>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="meetingName"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      </MeetingRoadmapNode>
      <Handle type="source" position={Position.Bottom} id="a" />
    </React.Fragment>
  );
};
