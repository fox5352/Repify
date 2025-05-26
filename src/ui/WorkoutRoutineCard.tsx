import { cn } from "@/lib/utils";
import type { DatabaseMetaData, WorkoutRoutine, WorkoutType } from "../model/workoutroutine.model";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function WorkoutRoutineCard({ title, workouts, className }: WorkoutRoutine & DatabaseMetaData & { className?: string }) {


  const rowBuilder = (workout: WorkoutType, index?: number) => {
    const { name, sets, reps, time, weight } = workout;
    return (
      <TableRow>
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
    </Card>
  )

}
