import { useEffect, useState } from "react"

import { SkeletonCard } from "../../components//ui/skeletonCard"
import { getWorkoutRoutines, type DatabaseMetaData, type WorkoutRoutine } from "@/model/workoutroutine.model";
import { useNotify } from "@/ui/Notify";
import WorkoutRoutineCard from "@/ui/WorkoutRoutineCard";

type Posts = WorkoutRoutine & DatabaseMetaData;

export default function Posts({ }: { id: string }) {
  const { trigger } = useNotify();
  const [posts, setPosts] = useState<Posts[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoaded(false);
        const posts = await getWorkoutRoutines();

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
  }, [])

  return (
    <>
      {
        !isLoaded &&
        <LoadingState />
      }
      <div>
        {posts.length > 0 && posts.map((post) => {
          return <WorkoutRoutineCard key={post.id} {...post} />
        })}
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
