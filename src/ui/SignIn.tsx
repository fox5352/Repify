import { isAuthenticated, signIn, signOut, updateOnAuthChange } from "../model/database"
import { useEffect, useState, type ReactNode } from "react";

export function SignInButton({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <button className={className} onClick={signIn}>
      {children}
    </button>
  )
}

export function SignOutButton({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <button className={className} onClick={signOut}>
      {children}
    </button>
  )
}

export function SignedIn({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchSesh = async () => {
      if (await isAuthenticated()) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      updateOnAuthChange((session) => {
        if (session) {
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
      })
    }

    fetchSesh();
  }, [])


  return (
    <>
      {isAuth && children}
    </>
  )
}

export function SignedOut({ children }: { children: ReactNode }) {
  const [isNotAuth, setIsNotAuth] = useState(false);

  useEffect(() => {
    const fetchSesh = async () => {
      if (!await isAuthenticated()) {
        setIsNotAuth(true)
      } else {
        setIsNotAuth(false);
      }

      updateOnAuthChange((session) => {
        if (session) {
          setIsNotAuth(false)
        } else {
          setIsNotAuth(true)
        }
      })
    }

    fetchSesh();
  }, [])

  return (
    <>
      {isNotAuth && children}
    </>
  )
}
