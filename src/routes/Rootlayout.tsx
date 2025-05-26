import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router";

import { Header } from "../ui/Header";
import Notify, { NotifyProvider } from "@/ui/Notify";

export default function Rootlayout() {

  return (
    <NotifyProvider>
      <Header />
      <main className="w-full max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Notify />
    </NotifyProvider>
  )
}
