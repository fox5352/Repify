import { getAllWorkoutRoutines, type SortFilter, type getWorkoutRoutineType } from "@/model/workoutroutine.model";
import { useEffect, useMemo, useState } from "react"
import { useNotify } from "./Notify";
import SkeletionBox from "@/components/ui/SkeletonBox";
import WorkoutRoutineCard from "./WorkoutRoutineCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router";

export function Explore() {
  const { trigger } = useNotify();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<getWorkoutRoutineType[]>([]);
  //
  const [sortOrder, _setSortOrder] = useState<SortFilter>("acs");
  const [searchParams, _serSearchParmas] = useSearchParams();
  const [limit, _setLimit] = useState(10);
  const page = useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams.get("page")])

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
      {
        <div className="space-y-2.5">
          {posts.length > 0 && posts.map((post) => {
            return <WorkoutRoutineCard key={post.id} {...post} />
          })}
        </div>
      }
      <Pagination limit={limit} />
    </>
  )
}
