import { getAllWorkoutRoutines, type getWorkoutRoutineType } from "@/model/workoutroutine.model";
import { useEffect, useState } from "react"
import { useNotify } from "./Notify";
import WorkoutRoutineCard from "./WorkoutRoutineCard";
import Pagination from "./Pagination";
import SearchControls, { useSearchControls } from "./SearchControls";
import type { StateError } from "..";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorCard } from "./ErrorCard";

export function Explore() {
  const { trigger } = useNotify();

  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<getWorkoutRoutineType[]>([]);
  const [error, setError] = useState<StateError | null>(null)
  // page datas management
  const { sortOrder, page, limit } = useSearchControls();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        setError(null);
        const result = await getAllWorkoutRoutines(page, limit, sortOrder);

        if (!result) {
          trigger("failed to get posts", "error");
          setError({ message: "Posts not available try again later", severity: "warning" })
          return;
        }

        if (result.length === 0) {
          setError({ message: "No posts listed", severity: "info" })
          return;
        }

        setPosts(result);
      } catch (error) {
        trigger("failed to get posts", "error");
        setError({ message: "Failed to get posts", severity: "error" })
      } finally {
        setIsLoaded(true);
      }
    }

    if (navigator.onLine) {
      fetchData();
    } else {
      setError({ message: "Users internet connection is offline", severity: "warning" })
      setIsLoaded(true);
    }
  }, [page, limit, sortOrder])

  return (
    <>
      {posts.length > 0 && <SearchControls />}
      <div className="space-y-2.5">
        {
          !isLoaded ?
            <>
              {new Array(5).fill(0).map((_, index) => {
                return <Loading key={index} />
              })}
            </>
            :
            !error ?
              <>
                {posts.length > 0 && posts.map((post) => {
                  return <WorkoutRoutineCard key={post.id} {...post} />
                })}
              </> :
              <>
                <ErrorCard severity={error.severity} message={error.message} title="Posts Error" />
              </>
        }
      </div>
      {posts.length > 0 && <Pagination />}

    </>
  )
}

function Loading() {
  return (
    <Card className="flex w-full">
      <CardHeader>
        <CardTitle className="my-4">
          <Skeleton className="w-4/5 h-4 min-w-[250px] bg-zinc-200 dark:bg-zinc-800" />
        </CardTitle>
        <CardContent className="px-0 gap-2 space-y-2">
          <Skeleton className="h-[125px] min-w-[250px] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-[125px] min-w-[250px] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />

        </CardContent>
      </CardHeader>
    </Card>
  )
}
