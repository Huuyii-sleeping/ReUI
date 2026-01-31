import * as React from "react";

type Size = { width: number; height: number };

const useSize = (targetRef: React.RefObject<HTMLElement>): Size | undefined => {
  const [size, setSize] = React.useState<Size | undefined>(() => {
    const el = targetRef.current;
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setSize({ width: clientWidth, height: clientHeight });
      });
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return size;
};

export default useSize;
