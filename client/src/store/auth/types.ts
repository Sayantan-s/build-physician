import { WritableDraft } from "immer";

export interface IUser {
  created_at: Date;
  email: string;
  id: string;
  name: string;
  new_user: boolean;
  picture: string;
  provider: string;
  updated_at: Date;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isPending: boolean;
}

export interface IAuthAction {
  setLogin: (payload: IUser) => void;
  setPendingStatus: (pendingStatus: boolean) => void;
  setLogout: () => void;
}

export type IAuthStateSetterType = (
  nextStateOrUpdater:
    | (IAuthState & IAuthAction)
    | Partial<IAuthState & IAuthAction>
    | ((state: WritableDraft<IAuthState & IAuthAction>) => void)
) => void;
