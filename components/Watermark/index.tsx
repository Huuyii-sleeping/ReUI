import * as React from "react";
import useWatermark from "../../hooks/useWatermark";

export interface WatermarkProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
  zIndex?: string | number;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string | string[];
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  gap?: [number, number];
  offset?: [number, number];
  getContainer?: () => HTMLElement;
}

const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const getContainer = React.useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!;
  }, [props.getContainer, containerRef.current]);

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });

  React.useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default Watermark;
