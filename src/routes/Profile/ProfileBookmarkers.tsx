import { SkeletonCard } from "@/components/ui/skeletonCard";
import { getBookmarkers } from "@/model/bookmarker.model";
import type { getWorkoutRoutineType } from "@/model/workoutroutine.model";
import { useNotify } from "@/ui/Notify";
import WorkoutRoutineCard from "@/ui/WorkoutRoutineCard";
import { useEffect, useState } from "react";

export function Bookmarkers() {
  const { trigger } = useNotify();
  const [bookmarkers, setBookMarkers] = useState<getWorkoutRoutineType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);

        const bookmarkers = await getBookmarkers();

        if (!bookmarkers) {
          throw new Error("falild to get bookmarkers")
        }

        setBookMarkers(bookmarkers)
      } catch (error) {
        trigger("failed to get bookmarkers try again later", "error")
      } finally {
        setIsLoaded(true);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      {
        !isLoaded &&
        <LoadingState />
      }
      <div>
        {bookmarkers.length > 0 && bookmarkers.map((post) => {
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
