import * as React from "react";

const useLifecycles = (mount: Function, unmount?: Function) => {
  React.useEffect(() => {
    if (mount) {
      mount();
    }

    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
};

export default useLifecycles;
