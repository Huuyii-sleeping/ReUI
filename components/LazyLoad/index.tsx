import * as React from "react";
import type { CSSProperties } from "react";

interface LazyLoadProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: React.ReactNode;
  offset?: string | number;
  width?: number | string;
  height?: number | string;
  onContentVisible?: () => void;
  children: React.ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = (props) => {
  const {
    className = "",
    style,
    placeholder,
    offset = 0,
    width,
    height,
    onContentVisible,
    children,
  } = props;

  const containRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  console.log(111111);

  // 防止闭包陷阱，每次都拿到新的函数
  const onContentVisibleRef = React.useRef(onContentVisible);
  onContentVisibleRef.current = onContentVisible;

  const elementObserver = React.useRef<IntersectionObserver>(null);

  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;
    // true 表示元素进入了视口 false 表示元素离开视口
    if (isIntersecting) {
      setVisible(true);
      onContentVisibleRef.current?.();
      const node = containRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  // 添加上对应的监听的内容
  React.useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
      threshold: 0,
    };
    elementObserver.current = new IntersectionObserver(
      lazyLoadHandler,
      options,
    );

    const node = containRef.current;
    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  const styles = { height, width, ...style };
  return (
    <div ref={containRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;
