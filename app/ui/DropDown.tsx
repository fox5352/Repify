"use client"
import { ReactNode } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DropDownMenuProps {
  label: string | ReactNode;
  children: string | ReactNode;
}

export default function DropDown({ label, children }: DropDownMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white dark:bg-black text-black dark:text-white transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] transition-transform duration-200 ease-linear hover:scale-95 active:bg-black active:text-white dark:active:bg-white dark:active:text-black">
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          children
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
