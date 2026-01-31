import * as React from "react";

export type Element =
  | ((state: boolean) => React.ReactElement)
  | React.ReactElement;

const useHover = (element: Element): [React.ReactElement, boolean] => {
  const [state, setState] = React.useState(false);
  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    originalOnMouseEnter?.(event);
    setState(true);
  };

  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event);
    setState(false);
  };

  if (typeof element === "function") {
    element = element(state);
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter((element.props as any).onMouseEnter),
    onMouseLeave: onMouseLeave((element.props as any).onMouseLeave),
  } as any);

  return [el, state];
};

export default useHover;
