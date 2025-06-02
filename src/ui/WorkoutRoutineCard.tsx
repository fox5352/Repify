import { acn, cn } from "@/lib/utils";
import { deleteWorkoutRoutine, type DatabaseMetaData, type getWorkoutRoutineType, type WorkoutRoutine } from "../model/workoutroutine.model";

import { useNavigate } from "react-router";

import { Card, CardHeader, CardContent, CardTitle, CardAction } from "@/components/ui/card";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BookmarkIcon, Trash2 } from "lucide-react";
import { getUser } from "@/model/user.model";
import { Button } from "@/components/ui/button";
import { useNotify } from "./Notify";
import { bookmarkExists, createBookMarker, deleteBookmarker } from "@/model/bookmarker.model";
import WorkoutTable from "./WorkoutTable";

export default function WorkoutRoutineCard({
  id, user_id,
  title, workouts,
  className, filter
}:
  WorkoutRoutine & DatabaseMetaData &
  { className?: string, filter?: (id: string) => void }
) {
  const cardRef = useRef<HTMLElement>(null)
  const { trigger } = useNotify();
  const navigate = useNavigate();
  const [isOwnerViewing, setIsOwnerViewing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      if (!isOwnerViewing) return;

      const succsess = await deleteWorkoutRoutine(id);

      if (succsess && filter) filter(id);
    } catch (error) {
      trigger("failed to delete post", "error");
      console.error(error);
    }
  }

  const handleBoomark = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isBookmarked) {
      await createBookMarker({
        _id: id, title, workouts
      });

      setIsBookmarked(true);
    } else {
      await deleteBookmarker(id);
      setIsBookmarked(false);
    }
  }

  const ridirect = () => {
    const data: getWorkoutRoutineType = {
      id,
      workouts,
      created_at: "",
      title,
      user_id
    }
    navigate(`/workouts/${id}`, {
      state: {
        data
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsOwnerViewing(false)
      const user = await getUser();

      if (user && user.id === user_id) {
        setIsOwnerViewing(true);
      }
    };

    const checkIsBookmarker = async () => {
      const isBookmarker = await bookmarkExists(id);

      setIsBookmarked(isBookmarker);
    }

    fetchData()
    checkIsBookmarker();
  }, [user_id])

  return (
    <Card ref={cardRef} className={`hover:cursor-pointer ${cn(className)}`} onClick={ridirect}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <WorkoutTable workouts={workouts} />
      </CardContent>
      <CardAction className="w-full space-x-2 px-2 md:px-6">
        <Button size="icon" className="bg-white text-black dark:bg-zinc-950 dark:text-white" onClick={handleBoomark}>
          <BookmarkIcon className={`text-amber-500 ${acn(isBookmarked, "bg-amber-500", "text-white", "rounded")}`} />
        </Button>
        {isOwnerViewing &&
          (<Button size="icon" className="bg-white text-black dark:bg-zinc-950 dark:text-white" onClick={handleDelete}>
            <Trash2 className="text-rose-600" />
          </Button>)
        }
      </CardAction>
    </Card>
  )

}
