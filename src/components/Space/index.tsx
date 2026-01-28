import classNames from "classnames";
import React from "react";
import "./index.scss";

export type SizeType = "small" | "medium" | "large" | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const Space: React.FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    size = "small",
    direction = "horizontal",
    align,
    wrap = false,
    ...otherProps
  } = props;
  const childNodes = React.Children.toArray(otherProps.children);
  const mergeAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  const cn = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergeAlign}`]: mergeAlign,
    },
    className,
  );
  const nodes = childNodes.map((child: any, index) => {
    const key = (child && child.key) || `space-item-${index}`;
    return (
      <div className="space-item" key={key}>
        {child}
      </div>
    );
  });
  return (
    <div className={cn} style={style} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Space;
