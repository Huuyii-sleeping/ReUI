import { useContext } from "react";
import { MessageRef } from ".";
import { ConfigContext } from "./ConfigProvider";

export function useMessage(): MessageRef {
  const { messageRef } = useContext(ConfigContext);
  if (!messageRef) {
    throw new Error("useMessage must be used within a ConfigProvider");
  }
  return messageRef.current!;
}
