import type { ReactNode } from "react";

import { SignedIn, SignedOut, SignInButton, SignOutButton } from "./SignIn";
import { Link, useLocation } from "react-router";
import Divider from "@/ui/Divider";
import { genId } from "@/lib/utils";
import AppBar from "./AppBar";

export function Header() {
  const { pathname } = useLocation();

  const links: { text: string, to: string, desc: string }[] = [
    { text: "Feed", to: "/", desc: "home page with feed of others posts" },
    { text: "Create", to: "/auth/create", desc: "create new post or workout routine" },
    { text: "Profile", to: "/auth/user", desc: "Users profile page read stats and more" },
    { text: "Settings", to: "/settings", desc: "Settings for your app" }
  ]

  const mapper = ({ text, to }: { text: string, to: string }, index: number): ReactNode => {
    const style = to == pathname ? "bg-black text-white" : "";
    const id = genId();

    return (
      <div className="flex h-full" key={id}>
        <Link to={to} className={`py-1 px-2 duration-200 ease-linear active:bg-zinc-500 ${style}`}>{text}</Link>
        {index != links.length - 1 && (<Divider size="full" />
        )}
      </div>
    )
  }

  return (
    <header className="pr-2 lg:pr-0 mx-auto max-w-7xl">
      <div className="flex justify-between">
        {/* Header Logo */}
        <div className="mr-4 flex  px-4 py-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Repify</span>
          </Link>
        </div>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center my-1 border-2 border-black rounded-md overflow-hidden" >
          {
            links.map(mapper)
          }
          <Divider size="full" />
          <span className="py-1 px-2 duration-200 ease-linear active:bg-zinc-500">
            <SignedOut>
              <SignInButton>
                LogIn
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                LogOut
              </SignOutButton>
            </SignedIn>
          </span>
        </nav>

        {/* Mobile Nav */}
        <AppBar links={links} mapper={mapper} />
      </div>
    </header>
  )
}
