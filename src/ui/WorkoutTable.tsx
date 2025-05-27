import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { WorkoutType } from "../model/workoutroutine.model";
import { cn } from "@/lib/utils";


export default function({ workouts, className }: { workouts: WorkoutType[], className?: string }) {
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
    <Table className={`${cn(className)}`}>
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
  )
}
