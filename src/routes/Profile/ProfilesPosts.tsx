import { useEffect, useState } from "react"

import { getWorkoutRoutines, type DatabaseMetaData, type WorkoutRoutine } from "@/model/workoutroutine.model";
import { useNotify } from "@/ui/Notify";
import WorkoutRoutineCard from "@/ui/WorkoutRoutineCard";
import Pagination from "@/ui/Pagination";
import SearchControls, { useSearchControls } from "@/ui/SearchControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorCard } from "@/ui/ErrorCard";
import type { StateError } from "@/index";

type Posts = WorkoutRoutine & DatabaseMetaData;

export default function Posts({ }: { id: string }) {
  const { trigger } = useNotify();

  const [posts, setPosts] = useState<Posts[]>([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<StateError | null>(null);
  // page datas management
  const { page, limit, sortOrder } = useSearchControls();


  const filter = (id: string) => {
    setPosts(_prev => posts.filter(post => post.id != id))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoaded(false);
        setError(null);

        const posts = await getWorkoutRoutines(page, limit, sortOrder);

        if (!posts) {
          setError({ message: "Failed to fetch posts", severity: "error" });
          return;
        }

        if (posts.length === 0) {
          setError({ message: "No posts found", severity: "info" });
          return;
        }

        setPosts(posts);
      } catch (error) {
        console.error(error)
        setError({ message: "Failed to fetch postss", severity: "error" });
      } finally {
        setIsLoaded(true);
      }
    }

    fetchPosts();
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
                  return <WorkoutRoutineCard key={post.id} {...post} filter={filter} />
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
