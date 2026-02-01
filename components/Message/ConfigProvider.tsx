import * as React from "react";
import { MessageProvider, MessageRef } from ".";

interface ConfigProviderProps {
  messageRef?: React.RefObject<MessageRef>;
}

export const ConfigContext = React.createContext<ConfigProviderProps>({});

export function ConfigProvider(props: React.PropsWithChildren) {
  const { children } = props;
  const messageRef = React.useRef<MessageRef>(null);
  return (
    <ConfigContext.Provider value={{ messageRef } as any}>
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
