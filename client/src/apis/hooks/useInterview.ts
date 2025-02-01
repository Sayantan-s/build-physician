import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IInviteParticipants, Interview } from "@apis/http/endpoints/interview";

export const SEND_INVITES = "SEND_INVITES" as const;

export interface IUseSendInvitesOptions
  extends Omit<
    UseMutationOptions<unknown, unknown, IInviteParticipants>,
    "mutationFn" | "mutationKey"
  > {}

const useSendInvites = (options?: IUseSendInvitesOptions) => {
  return useMutation({
    mutationKey: [SEND_INVITES],
    mutationFn: async (_interview: IInviteParticipants) => {
      const res = await Interview.sendInvites(_interview);
      return res.data;
    },
    onSuccess: async () => {},
    ...options,
  });
};

export const interviewApi = {
  useSendInvites,
};
