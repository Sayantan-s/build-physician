import { FC, PropsWithChildren } from "react";
import { useAuthStore } from "../../store/auth";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  const { isPending } = useAuthStore();
  return isPending ? <div>loading...</div> : children;
};
