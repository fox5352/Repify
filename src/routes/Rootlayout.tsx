import { Outlet } from "react-router";

import { Header } from "../ui/Header";
import Notify, { NotifyProvider } from "@/ui/Notify";
import { useEffect } from "react";
import { isAuthenticated, updateOnAuthChange } from "@/model/database";
import { tryIncrementDaysActive } from "@/model/user.model";

export default function Rootlayout() {

  useEffect(() => {
    const bookKeeping = async () => {
      if (await isAuthenticated()) {
        await tryIncrementDaysActive();
      }

    }
    bookKeeping();
  }, [])

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
