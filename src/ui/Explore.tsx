import { getAllWorkoutRoutines, type getWorkoutRoutineType } from "@/model/workoutroutine.model";
import { useEffect, useState } from "react"
import { useNotify } from "./Notify";
import SkeletionBox from "@/components/ui/SkeletonBox";
import WorkoutRoutineCard from "./WorkoutRoutineCard";

export function Explore() {
  const { trigger } = useNotify();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<getWorkoutRoutineType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        const result = await getAllWorkoutRoutines();

        if (!result) {
          trigger("failed to get posts", "error");
          return;
        }

        setPosts(result);
      } catch (error) {
        trigger("failed to get posts", "error");
      } finally {
        setIsLoaded(true);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      {
        !isLoaded && (
          <>
            <SkeletionBox />
            <SkeletionBox />
          </>
        )
      }
      {
        <div className="space-y-2.5">
          {posts.length > 0 && posts.map((post) => {
            return <WorkoutRoutineCard key={post.id} {...post} />
          })}
        </div>
      }
    </>
  )
}
