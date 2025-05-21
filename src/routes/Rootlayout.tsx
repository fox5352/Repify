import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router";

import { Header } from "../ui/Header";
import Notify, { NotifyProvider } from "@/ui/Notify";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function Rootlayout() {

  return (
    <div>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <NotifyProvider>
          <Header />
          <main className="w-full max-w-3xl mx-auto">
            <Outlet />
          </main>
          <Notify />
        </NotifyProvider>
      </ClerkProvider>
    </div>
  )
}
