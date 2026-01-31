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

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

const useHoverByRef = (
  ref: React.RefObject<HTMLElement>,
  options?: Options,
): boolean => {
  const { onEnter, onLeave, onChange } = options || {};
  const [isEnter, setIsEnter] = React.useState(false);
  React.useEffect(() => {
    ref.current.addEventListener("mouseenter", () => {
      onEnter?.();
      setIsEnter(true);
      onChange?.(true);
    });
    ref.current.addEventListener("mouseleave", () => {
      onLeave?.();
      setIsEnter(false);
      onChange?.(false);
    });
  }, [ref]);

  return isEnter;
};

export default useHover;
