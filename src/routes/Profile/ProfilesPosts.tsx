import { useEffect, useMemo, useState } from "react"

import { SkeletonCard } from "../../components//ui/skeletonCard"
import { getWorkoutRoutines, type DatabaseMetaData, type WorkoutRoutine } from "@/model/workoutroutine.model";
import { useNotify } from "@/ui/Notify";
import WorkoutRoutineCard from "@/ui/WorkoutRoutineCard";
import Pagination from "@/ui/Pagination";
import SearchControls, { useSearchControls } from "@/ui/SearchControls";

type Posts = WorkoutRoutine & DatabaseMetaData;

export default function Posts({ }: { id: string }) {
  const { trigger } = useNotify();
  const [posts, setPosts] = useState<Posts[]>([])
  const [isLoaded, setIsLoaded] = useState(false);
  // page datas management
  const { page, limit, sortOrder } = useSearchControls();


  const filter = (id: string) => {
    setPosts(_prev => posts.filter(post => post.id != id))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoaded(false);
        const posts = await getWorkoutRoutines(page, limit, sortOrder);

        if (!posts) {
          trigger("Failed to fetch posts", "error");
          return;
        }

        setPosts(posts);
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoaded(true);
      }
    }

    fetchPosts();
  }, [page, limit, sortOrder])

  return (
    <>
      {
        !isLoaded &&
        <LoadingState />
      }
      <div className="space-y-2.5">
        <SearchControls />
        {posts.length > 0 && posts.map((post) => {
          return <WorkoutRoutineCard key={post.id} {...post} filter={filter} />
        })}
        <Pagination filter="user" />
      </div>
    </>
  )
}

function LoadingState() {
  const bam = new Array(3).fill(0);
  return (
    <div className="space-y-1.5">
      {bam.map((_, index) =>
        <SkeletonCard key={index} className="w-full" />
      )}
    </div>
  )
}
