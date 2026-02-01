import * as React from "react";

const useTimeout = (fn: () => void, delay: number) => {
  const fnRef = React.useRef<Function>(fn);
  fnRef.current = fn;
  const timerRef = React.useRef<number>(null);
  const clear = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  React.useEffect(() => {
    timerRef.current = setTimeout(fnRef.current, delay);
    return clear;
  }, [delay]);
};

export default useTimeout;
