import { isAuthenticated, signIn, signOut, updateOnAuthChange } from "../model/database"
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GitBranch, Mail, X } from "lucide-react";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

export function SignInButton({ className, children }: { className?: string, children: ReactNode }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggle = () => setToggleMenu(prev => !prev);

  return (
    <>
      <button className={className} onClick={toggle}>
        {children}
      </button>
      {
        toggleMenu && (
          <nav className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[220px]">
            <Card className="">
              <CardHeader className="flex w-full">
                <CardTitle className="basis-full text-2xl">Sign In</CardTitle>
                <Button size="icon" onClick={toggle}><X /></Button>
              </CardHeader>
              <CardAction className="grid grid-cols-5 md:grid-cols-8 w-full gap-2">
                <Button className="col-start-2 col-span-3 md:col-start-2 md:col-span-6" onClick={() => signIn("github")}>
                  <GitBranch className="mr-2" /> GitHub
                </Button>
                <Button className="col-start-2 col-span-3 md:col-start-2 md:col-span-6" disabled>
                  <Mail className="mr-2" /> Google
                </Button>
              </CardAction>
            </Card>
          </nav>
        )
      }
    </>
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
