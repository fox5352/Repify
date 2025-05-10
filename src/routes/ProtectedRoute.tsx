import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <h2>Loading...</h2>
  }

  if (!isSignedIn) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
