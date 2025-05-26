import { useNotify } from "@/ui/Notify";
import { useEffect, useState } from "react";
import { isAuthenticated, updateOnAuthChange } from "@/model/database";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { trigger } = useNotify();

  useEffect(() => {
    const fetchSesh = async () => {
      try {
        setIsLoading(true);

        setIsAuth(await isAuthenticated());
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }

    updateOnAuthChange((session) => {
      if (session) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })

    fetchSesh();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }


  if (!isAuth) {
    trigger("You must be signed in to access this page", "info");
    return <Navigate to="/" />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
