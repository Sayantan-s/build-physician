import { useState } from "react";

type IHookReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  },
];
export const useSwitch = (defaultState?: boolean): IHookReturnType => {
  const [state, setState] = useState(() => !!defaultState);
  const on = () => setState(true);
  const off = () => setState(false);
  const toggle = () => setState((prevState) => !prevState);
  return [state, { on, off, toggle }];
};
