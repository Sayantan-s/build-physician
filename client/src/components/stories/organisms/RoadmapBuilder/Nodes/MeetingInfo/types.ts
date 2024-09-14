import { Node } from "@xyflow/react";

export type IMeetingNodeInfo = {
  meetingName: string;
  meetingDescription: string;
};

export type TMeetingInfoNode = Node<IMeetingNodeInfo>;
