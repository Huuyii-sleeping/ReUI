import * as React from "react";
import useStore from "./useStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./index.scss";
import { createPortal } from "react-dom";
import { useTimer } from "./useTimer";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: React.CSSProperties;
  className?: string | string[];
  content: React.ReactNode | string;
  duration?: number;
  onClose?: (...args: any) => void;
  id?: number;
  position?: Position;
}

const MessageItem = React.forwardRef<HTMLDivElement, MessageProps>(
  (item, ref) => {
    const { onMouseEnter, onMouseLeave } = useTimer({
      id: item.id!,
      duration: item.duration,
      remove: item.onClose!,
    });

    return (
      <div
        ref={ref}
        className="message-item"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={item.style}
      >
        {item.content}
      </div>
    );
  },
);

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

export const MessageProvider = React.forwardRef<MessageRef, {}>(
  (props, ref) => {
    const { messageList, add, update, remove, clearAll } = useStore("top");

    if ("current" in ref!) {
      ref.current = {
        add,
        update,
        remove,
        clearAll,
      };
    }

    const positions = Object.keys(messageList) as Position[];

    const messageWrapper = (
      <div className="message-wrapper">
        {positions.map((direction) => {
          return (
            <div className={`message-wrapper-${direction}`} key={direction}>
              <TransitionGroup>
                {messageList[direction].map((item) => {
                  const nodeRef = React.createRef<HTMLDivElement>();
                  return (
                    <CSSTransition
                      key={item.id}
                      timeout={1000}
                      classNames="message"
                      nodeRef={nodeRef}
                    >
                      <MessageItem
                        onClose={remove}
                        ref={nodeRef}
                        {...item}
                      ></MessageItem>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </div>
          );
        })}
      </div>
    );

    const el = React.useMemo(() => {
      const el = document.createElement("div");
      el.className = `wrapper`;

      document.body.appendChild(el);
      return el;
    }, []);

    return createPortal(messageWrapper, el);
  },
);
