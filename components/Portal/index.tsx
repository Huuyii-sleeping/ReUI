import * as React from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

export function getAttach(attach: PortalProps["attach"]) {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }
  return document.body;
}

const Portal = React.forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;
  const container = React.useMemo(() => {
    const el = document.createElement("div");
    el.className = "portal-wrapper";
    return el;
  }, []);

  React.useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild(container);
    return () => {
      parentElement?.removeChild(container);
    };
  }, [attach, container]);

  React.useImperativeHandle(ref, () => container);
  return createPortal(children, container);
});

export default Portal;
