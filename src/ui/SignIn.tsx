import { isAuthenticated, signIn, signInWithEmail, signOut, signUpWithEmail, updateOnAuthChange } from "../model/database"
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GitBranch, Mail, X } from "lucide-react";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@radix-ui/react-menubar";
import { Input } from "@/components/ui/input";

export function SignInButton({ className, children }: { className?: string, children: ReactNode }) {
  const [toggleSheet, setToggleSheet] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggle = () => setToggleMenu(prev => !prev);

  const toggleSheetMenu = () => setToggleSheet(prev => !prev);

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
                <Button className="col-start-2 col-span-3 md:col-start-2 md:col-span-6" onClick={toggleSheetMenu}>
                  <Mail className="mr-2" /> Email
                </Button>
              </CardAction>
            </Card>
            <EmailSignIn isOpen={toggleSheet} toggleSheet={toggleSheetMenu} />
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


function EmailSignIn({ isOpen, toggleSheet }: { isOpen: boolean, toggleSheet: () => void }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const loginAction = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    //@ts-ignore
    let { email, password }: { email: string, password: string } = Object.fromEntries(new FormData(formEvent.currentTarget));


    setLoading(true);
    if (mode == "signup") {
      const { error } = await signUpWithEmail(email as string, password as string);
      if (error) {
        console.error(error);
      }
    } else {
      const { error } = await signInWithEmail(email as string, password as string);
      if (error) {
        console.error(error);
      }
    }

    toggleSheet();

    setLoading(false);

  }

  return <>
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) toggleSheet();
    }}>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>{
            mode == "login" ? "Login" : "Sign Up"
          }</SheetTitle>
          <SheetDescription>
            Login in or sign up with your email
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <form onSubmit={loginAction}>
            <div className="grid gap-3">
              <Label>Email:</Label>
              <Input name="email" type="email" placeholder="fightmilknotreal@gmail.com" />
            </div>
            <div className="grid gap-3">
              <Label>Password:</Label>
              <Input name="password" type="password" />
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mt-2">
              <Button type="button" onClick={() => setMode(prev => prev == "login" ? "signup" : "login")}>{mode == "login" ? "Sign up" : "Login"}</Button>
              <Button type="submit" disabled={loading}>Send</Button>
            </div>
          </form>
        </div >
        <SheetFooter>
          <Button onClick={toggleSheet}>Close</Button>
        </SheetFooter>
      </SheetContent >
    </Sheet >  </>
}
