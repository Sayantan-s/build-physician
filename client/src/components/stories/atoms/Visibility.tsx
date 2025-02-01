import React, { FC, PropsWithChildren } from "react";

export interface IProps {
  show: boolean;
}

export const Visibility: FC<PropsWithChildren<IProps>> = ({
  show,
  children,
}) => (show ? children : null);
