import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router";
import Divider from "@/ui/Divider";
import { genId } from "@/lib/utils";

export function Header() {
  const { pathname } = useLocation();

  const links: { text: string, to: string }[] = [
    { text: "Feed", to: "/" },
    { text: "Saved", to: "/dashboard" },
    { text: "Profile", to: "/user" }
  ]

  const Desktopmapper = ({ text, to }: { text: string, to: string }, index: number) => {
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
    <header className="mx-auto max-w-7xl">
      <div className="flex justify-between">
        {/* Header Logo */}
        <div className="mr-4 flex  px-4 py-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Repify</span>
          </Link>
        </div>


        {/* Desktop Nav */}
        <nav className="flex items-center my-1 border-2 border-black rounded-md overflow-hidden" >
          {
            links.map(Desktopmapper)
          }
        </nav>
      </div>

    </header>
  )
}


function temp() {
  return (
    <nav>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  )
}
