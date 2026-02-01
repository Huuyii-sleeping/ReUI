// 这个钩子的作用就是告诉那些props改变导致的重新渲染

import * as React from "react";

export type IPrrops = Record<string, any>;

const useWhyDidYouUpdate = (component: string, props: IPrrops) => {
  const prevProps = React.useRef<IPrrops>({});

  React.useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IPrrops = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", component, changedProps);
      }
    }
    prevProps.current = props;
  });
};

export default useWhyDidYouUpdate;
