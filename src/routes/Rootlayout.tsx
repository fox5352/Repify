import { Outlet } from "react-router";

import { Header } from "../ui/Header";
import Notify, { NotifyProvider } from "@/ui/Notify";
import { useEffect, useRef } from "react";
import { isAuthenticated } from "@/model/database";
import { tryIncrementDaysActive } from "@/model/user.model";
import Footer from "@/ui/Footer";
import { SearchControlsProvider } from "@/ui/SearchControls";
import CookieConsentBanner from "@/ui/CookieBanner";
import { ConsentCookieProvider } from "@/ui/AdLoader";
import UpdateChecker from "@/ui/UpdateChecker";

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
    <ConsentCookieProvider>
      <NotifyProvider>
        <SearchControlsProvider>
          <Header />
          <main ref={mainRef} className="w-full max-w-4xl mx-auto">
            <Outlet />
          </main>
          <Footer mainRef={mainRef} />
          <Notify />
          <UpdateChecker />
          {/* <CookieConsentBanner /> */}
        </SearchControlsProvider>
      </NotifyProvider>
    </ConsentCookieProvider>
  )
};
