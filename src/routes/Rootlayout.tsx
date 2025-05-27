import { Outlet } from "react-router";

import { Header } from "../ui/Header";
import Notify, { NotifyProvider } from "@/ui/Notify";
import { useEffect, useRef } from "react";
import { isAuthenticated } from "@/model/database";
import { tryIncrementDaysActive } from "@/model/user.model";
import Footer from "@/ui/Footer";

export default function Rootlayout() {
  const mainRef = useRef<HTMLDivElement>(null);

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
      <main ref={mainRef} className="w-full max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer mainRef={mainRef} />
      <Notify />
    </NotifyProvider>
  )
};
