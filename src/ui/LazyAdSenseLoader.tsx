import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from 'js-cookie';
import type { Value } from "@radix-ui/react-select";

const COOKIE_NAME = "cookieConsent";

const setCookie = (name: string, value: string, days: number = 365) => {
  Cookies.set(name, value, { expires: days, path: '/' });
};

// Get a cookie
const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// cookie state management
type Value = "accepted" | "declined";
type SubType = (cookie?: Value) => void;

interface ConsentCookieState {
  cookie?: Value;
  auth: boolean;
}

type UnSubType = () => void

interface ConsentCookieFuncs {
  updateCookie: (value: Value) => void;
  subscribe: (callback: SubType) => UnSubType;
}

const ConsentCookieContext = createContext<ConsentCookieState & ConsentCookieFuncs | null>(null);

const genId = () => `${new Date()}:${Math.floor(Math.random() * 9999)}:${Math.floor(Math.random() * 9999)}`;

export function ConsentCookieProvider({ children }: { children: ReactNode | string }) {
  const cookie: string | undefined = getCookie(COOKIE_NAME);
  const [value, setValue] = useState<ConsentCookieState>({
    auth: cookie === "accepted" ? true : false,
    cookie: cookie as Value || "declined"
  });
  const [callbacks, setCallBacks] = useState<Record<string, SubType>>({});

  const removeSub = (id: string) => {
    const newCallbacks = Object.entries(callbacks).reduce((prev: Record<string, SubType>, [key, value]) => {
      if (key !== id) prev[key] = value;
      return prev;
    }, {});

    setCallBacks(newCallbacks);
  }

  const updateCookie = (value: Value) => {
    const newValue = { value, auth: value == "accepted" ? true : false };
    setCookie(COOKIE_NAME, `${value}`)
    setValue(newValue);

    Object.values(callbacks).forEach(func => {
      func(value);
    })
  }

  const subscribe = (callback: SubType): SubType => {
    const id = genId();
    setCallBacks(prev => ({ ...prev, [id]: callback }));
    return () => removeSub(id);
  }

  const val: ConsentCookieState & ConsentCookieFuncs = {
    ...value,
    updateCookie,
    subscribe
  }

  return (
    <ConsentCookieContext.Provider value={val}>
      {children}
    </ConsentCookieContext.Provider>
  )
}

export const useConsentCookie = () => {
  const ctx = useContext(ConsentCookieContext);
  if (!ctx) throw new Error("useConsentCookie must be within ConsentCookieProvider");
  return ctx;
}

export default function() {
  const { auth } = useConsentCookie();


  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam repellat libero cumque, iure eos reiciendis accusamus. Facere architecto illo labore quia aspernatur soluta, assumenda, ducimus officiis ipsum dignissimos expedita.
    </div>
  )
}
