import { FC, PropsWithChildren } from "react";
import { useAuthStore } from "@store/auth";
import { authApi } from "@apis/hooks";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  authApi.useAuth();

  const { isPending } = useAuthStore();

  return isPending ? <div>Loading...</div> : children;
};
