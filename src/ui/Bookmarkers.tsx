import { SkeletonCard } from "@/components/ui/skeletonCard";
import { getBookmarkers, type Bookmarker } from "@/model/bookmarker.model";
import { useNotify } from "@/ui/Notify";
import WorkoutRoutineCard from "@/ui/WorkoutRoutineCard";
import { useEffect, useState } from "react";
import { ErrorCard } from "./ErrorCard";
import type { StateError } from "..";

export function Bookmarkers() {
  const { trigger } = useNotify();

  const [error, setError] = useState<StateError | null>(null);
  const [bookmarkers, setBookMarkers] = useState<Bookmarker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        setError(null);

        const bookmarkers = await getBookmarkers();
        if (!bookmarkers) {
          throw new Error("falild to get bookmarkers");
        }

        if (bookmarkers.length === 0) {
          setError({ message: "No bookmarkers", severity: "info" });
          return;
        }

        setBookMarkers(bookmarkers)
      } catch (error) {
        trigger("failed to get bookmarkers try again later", "error");
        setError({ message: "Bookmarkers not found", severity: "warning" });
      } finally {
        setIsLoaded(true);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <div>
        {
          !isLoaded ?
            <>
              <LoadingState />
            </>
            :
            error ?
              <>
                <ErrorCard severity={error.severity} message={error.message} title="Bookmarkers" />
              </>
              :
              <>
                {bookmarkers.length > 0 && bookmarkers.map((post, index) => {
                  return <WorkoutRoutineCard key={index} {...post} id={post.id} />
                })}
              </>
        }
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
