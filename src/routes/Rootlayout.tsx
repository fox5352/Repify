import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router";

import { Header } from "../ui/Header";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function Rootlayout() {

  return (
    <div className="">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Header />
        <main>
          <Outlet />
        </main>
      </ClerkProvider>
    </div>
  )
}
