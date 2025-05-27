import { getAllWorkoutRoutines, type getWorkoutRoutineType } from "@/model/workoutroutine.model";
import { useEffect, useState } from "react"
import { useNotify } from "./Notify";
import SkeletionBox from "@/components/ui/SkeletonBox";
import WorkoutRoutineCard from "./WorkoutRoutineCard";
import Pagination from "./Pagination";
import SearchControls, { useSearchControls } from "./SearchControls";

export function Explore() {
  const { trigger } = useNotify();

  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<getWorkoutRoutineType[]>([]);
  // page datas management
  const { sortOrder, page, limit } = useSearchControls();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        const result = await getAllWorkoutRoutines(page, limit, sortOrder);

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
  }, [page, limit, sortOrder])

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
      <SearchControls />
      {
        <div className="space-y-2.5">
          {posts.length > 0 && posts.map((post) => {
            return <WorkoutRoutineCard key={post.id} {...post} />
          })}
        </div>
      }
      <Pagination />
    </>
  )
}
