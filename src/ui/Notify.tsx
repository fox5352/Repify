import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { toast, Toaster } from "sonner";

type NotifyType = "info" | "success" | "error";

interface NotifyState {
  message?: string;
  type?: NotifyType;
}

interface Actions {
  trigger: (message: string, type?: NotifyType) => void;
  clear: () => void
}

const NotifyContext = createContext<NotifyState & Actions | null>(null);

const notifyReducer = (state: NotifyState, action: { type: string, payload?: NotifyState }) => {
  const { type, payload } = action;

  switch (type) {
    case "trigger": {
      return {
        message: payload?.message,
        type: payload?.type
      };
    } case "clear": {
      return {
        type: undefined,
        message: undefined
      } as NotifyState
    } default: {
      return state;
    }
  }
}

export function NotifyProvider({ children }: { children: ReactNode | string }) {
  const [state, dispatch] = useReducer(notifyReducer, {});

  const trigger = (message: string, type?: NotifyType = "info") => {
    dispatch({
      type: "trigger",
      payload: { message, type }
    });
  }

  const clear = () => {
    dispatch({
      type: "clear"
    })
  }

  const value = {
    ...state,
    trigger,
    clear
  }

  return (
    <NotifyContext.Provider value={value}>
      {children}
    </NotifyContext.Provider>
  )
}

export const useNotify = () => {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("NotifyProvider not found");
  return ctx
}

export default function Notify() {
  const { message, type, clear } = useNotify();
  const map: Record<string, string> = {
    // bg
    "error-bg": "var(--error-color)",
    "success-bg": "var(--ac-color)",
    "info-bg": "var(--warning-color)",
    //fg
    "info-fg": "black",
    "error-fg": "white",
    "success-fg": "white"
  }

  useEffect(() => {
    if (message != undefined) {
      toast(message)
      setTimeout(() => {
        clear();
      }, (type == "error" ? 10_000 : 3000) + 200)
    }
  }, [message, type])

  return (
    <Toaster toastOptions={{
      duration: type == "error" ? 10_000 : 3000,
      closeButton: true,
      style: {
        backgroundColor: map[`${type}-bg`],
        color: map[`${type}-fg`]
      }
    }} />
  )
}
