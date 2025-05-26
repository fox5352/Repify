import { cn } from "@/lib/utils";
import { deleteWorkoutRoutine, type DatabaseMetaData, type WorkoutRoutine, type WorkoutType } from "../model/workoutroutine.model";

import { Card, CardHeader, CardContent, CardTitle, CardAction } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { BookmarkIcon, Trash2 } from "lucide-react";
import { getUser } from "@/model/user.model";
import { Button } from "@/components/ui/button";
import { useNotify } from "./Notify";

export default function WorkoutRoutineCard({ id, user_id, title, workouts, className, filter }: WorkoutRoutine & DatabaseMetaData & { className?: string, filter: (id: string) => void }) {
  const { trigger } = useNotify();
  const [isOwnerViewing, setIsOwnerViewing] = useState(false);

  const handleDelete = async () => {
    try {
      if (!isOwnerViewing) return;

      const succsess = await deleteWorkoutRoutine(id);

      if (succsess) filter(id);
    } catch (error) {
      trigger("failed to delete post", "error");
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsOwnerViewing(false)
      const user = await getUser();

      if (user && user.id === user_id) {
        setIsOwnerViewing(true);
      }
    };

    fetchData()
  }, [user_id])


  const rowBuilder = (workout: WorkoutType, index?: number) => {
    const { name, sets, reps, time, weight } = workout;
    return (
      <TableRow key={index}>
        <TableCell>{name}</TableCell>
        <TableCell>{sets}</TableCell>
        <TableCell>{reps != undefined ? reps : null}</TableCell>
        <TableCell>{time != undefined ? time : null}</TableCell>
        <TableCell>{weight}kg</TableCell>
      </TableRow>)
  }


  return (
    <Card className={`${cn(className)}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Exercise
              </TableHead>
              <TableHead>
                Sets
              </TableHead>
              <TableHead>
                Reps
              </TableHead>
              <TableHead>
                Time
              </TableHead>
              <TableHead>
                Weight
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout, index) => rowBuilder(workout, index))}
          </TableBody>
        </Table>
      </CardContent>
      <CardAction className="w-full space-x-2 px-2 md:px-6">
        <Button size="icon" className="bg-white text-black dark:bg-zinc-950 dark:text-white" disabled>
          <BookmarkIcon className="text-amber-500" />
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
