import { FC, PropsWithChildren } from "react";
import { useAuthState } from "../../apis/hooks/auth";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useAuthState();
  return isLoading ? <div>loading...</div> : children;
};
