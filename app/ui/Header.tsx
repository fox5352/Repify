"use client"
import Link from "next/link"
import DropDown from "./DropDown"
import { BrutalButton } from "./BrutalButton"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function Header() {
  const menuItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Profile",
      href: "/user"
    }
  ]

  return (
    <header className="flex w-full items-center justify-between max-w-7xl mx-auto px-3 py-2 border-b-2 border-black dark:border-white">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-pink-400 via-indigo-500 to-black" />
        <h1 className="text-base font-bold md:text-2xl">Repify</h1>
      </div>
      {/* add nav bar here*/}
      <div className="hidden md:flex gap-2">
        <Link href="/">
          <BrutalButton>Home</BrutalButton>
        </Link>
        <Link href="/user">
          <BrutalButton>Profile</BrutalButton>
        </Link>
      </div>


      <div className="flex md:hidden">
        <DropDown label="Menu">
          {
            menuItems.map(item => (
              <Link href={item.href}>
                <DropdownMenuItem>
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))
          }
        </DropDown>
      </div>
    </header>
  )

}
