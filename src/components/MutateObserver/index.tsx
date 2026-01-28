import * as React from "react";
import useMutationObserver from "../../hooks/useMutateObserver";

interface MutationObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

const MutateObserver: React.FC<MutationObserverProps> = (props) => {
  const { options, onMutate = () => {}, children } = props;
  const elementRef = React.useRef<HTMLElement>(null);
  const [target, setTarget] = React.useState<HTMLElement>();
  /**
   * 这里不直接使用elementRef.current是因为在useLayoutEffect中设置target时，
   * 元素还未挂载，此时的target是undefined，所以不能直接使用elementRef.current
   */
  useMutationObserver(target!, onMutate, options);
  /**
   * 这里使用useLayoutEffect是因为在useEffect中设置target时，
   * 元素还未挂载，此时的target是undefined，所以不能直接使用elementRef.current
   * 保证能拿到元素实例 
   */
  React.useLayoutEffect(() => setTarget(elementRef.current!), []);
  if (!children) {
    return null;
  }
  return React.cloneElement(children, { ref: elementRef } as any);
};

export default MutateObserver;
