import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletionBox from "@/components/ui/SkeletonBox";
import { getWorkoutRoutineById, type getWorkoutRoutineType, type WorkoutType } from "@/model/workoutroutine.model"
import Divider from "@/ui/Divider";
import { useNotify } from "@/ui/Notify";
import WorkoutTable from "@/ui/WorkoutTable";
import { ArrowLeftIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router"

export default function WorkoutsPage() {
  const { trigger } = useNotify();
  const navigate = useNavigate();

  const { id } = useParams();
  const { state }: { state: { data: getWorkoutRoutineType } } = useLocation()
  const [pageData, setPageData] = useState<getWorkoutRoutineType | null>(state?.data || null)
  const [isLoaded, setIsLoaded] = useState(state?.data ? true : false);
  // workout start logic
  const [index, setIndex] = useState(0);
  const [tableRows, setTableRows] = useState<ArrayIterator<HTMLTableRowElement> | null>(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const startWorkout = () => {
    const tableRows = document.querySelectorAll("tr");
    if (!tableRows) {
      trigger("Failed to start workout", "info");
    }
    const rows: ArrayIterator<HTMLTableRowElement> = tableRows.values();

    setTableRows(rows);
    setWorkoutStarted(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pageData != null) return;
        setIsLoaded(false);
        const result = await getWorkoutRoutineById(id || "");

        if (!result) throw new Error("Failed to get page data")

        setPageData(result);
      } catch (error) {
        trigger("failed to get page data", "error")
      } finally {
        setIsLoaded(true);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <nav className="flex flex-start p-2 ">
        <Button size="sm" onClick={() => navigate(-1)} >
          <ArrowLeftIcon size={18} /> Back
        </Button>
      </nav >
      {
        !isLoaded ? (
          <>
            <SkeletionBox />
            <SkeletionBox />
          </>
        ) : pageData && (
          <>
            <div className="space-y-2">
              <div>
                <div className="p-2 rounded-t-md bg-linear-to-br from-[var(--ac-color-two)] via-[var(--ac-color)] to-[var(--ac-color-three)]">
                  <h3 className="text-2xl font-semibold text-white">
                    Routine:
                    <span>{pageData.title}</span>
                  </h3>
                </div>

                <div className="border-l-[var(--ac-color-two)] border-x-2 border-r-[var(--ac-color-three)]">
                  <WorkoutTable workouts={pageData.workouts} className="py-0" />
                </div>

                <div className="h-10 w-full rounded-b-md  bg-linear-to-tl from-[var(--ac-color-two)] via-[var(--ac-color)] to-[var(--ac-color-three)]" />
              </div>
              {/*  */}
              <Divider />
              <div className="flex justify-start flex-row-reverse w-full p-0.5">
                <Button className="border-2 border-zinc-950" onClick={startWorkout}>
                  <PlayIcon /> Start
                </Button>
              </div>
              <Divider />
            </div>
            {
              pageData && tableRows && (
                <WorkoutCard isActive={workoutStarted} index={index} setIndex={setIndex} workout={pageData.workouts} tableRows={tableRows} />
              )
            }
          </>
        )
      }
    </>
  )
}



function WorkoutCard({ isActive, index, setIndex, workout, tableRows }: { isActive: boolean, index: number, setIndex: (index: number) => void, workout: WorkoutType[], tableRows: ArrayIterator<HTMLTableRowElement> }) {


  return (
    <>{isActive && (
      <Card className="fixed z-30 top-1/2 left-1/2 -translate-1/2 w-sm">
        <CardHeader>
          <CardTitle>Testing</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic animi placeat deserunt fugit laboriosam, at, quibusdam aut accusantium consequatur, qui rerum? Veritatis asperiores fugit sapiente quisquam nesciunt minus obcaecati sequi!
        </CardContent>
        <CardAction>
        </CardAction>
      </Card>
    )}
    </>
  )
}
