import { api, IResponse } from "..";

const INTERVIEW = "/interview";
const SEND_INVITES = () => `${INTERVIEW}/invite`;

export interface IInterview {}

interface IParticipantDetail {
  name: string;
  email: string;
}

export interface IInviteParticipants {
  interviewee: IParticipantDetail;
  interviewer: IParticipantDetail;
  language: string;
}

export interface IRoadmapResponse {
  id: string;
  name: string;
  description: string;
  schema: string;
  created_by: string;
  updated_by: string;
}

export class Interview {
  constructor(private interview: IInterview) {}

  static async sendInvites(contract: IInviteParticipants) {
    return await api.post<unknown, IResponse<void>>(SEND_INVITES(), contract);
  }
}
