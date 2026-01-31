import * as React from "react";
import copy from "copy-to-clipboard";

interface CopyToClipboardProps {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: React.ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
  const { text, onCopy, children, options } = props;

  const elem = React.Children.only(children);

  function onClick(event: MouseEvent) {
    const elem = React.Children.only(children) as any;
    const result = copy(text, options);
    onCopy?.(text, result);
    if (typeof elem?.props?.onClick === "function") {
      elem.props.onClick(event);
    }
  }

  return React.cloneElement(elem, { onClick } as any);
};

export default CopyToClipboard;
