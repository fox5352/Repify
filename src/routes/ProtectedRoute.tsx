import { useNotify } from "@/ui/Notify";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useUser();
  const { trigger } = useNotify();

  if (!isLoaded) {
    return <h2>Loading...</h2>
  }

  if (!isSignedIn) {
    trigger("You must be signed in to access this page", "info");
    return <Navigate to="/" />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
