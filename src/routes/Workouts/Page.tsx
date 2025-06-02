import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletionBox from "@/components/ui/SkeletonBox";
import { getWorkoutRoutineById, type getWorkoutRoutineType, type WorkoutType } from "@/model/workoutroutine.model"
import Divider from "@/ui/Divider";
import { useNotify } from "@/ui/Notify";
import WorkoutTable from "@/ui/WorkoutTable";
import { ArrowLeftIcon, Loader2, PlayIcon, SkullIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react"
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

  const closeWorkout = () => setWorkoutStarted(false);

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
                <WorkoutCard isActive={workoutStarted} close={closeWorkout} index={index} setIndex={setIndex} workouts={pageData.workouts} tableRows={tableRows} />
              )
            }
          </>
        )
      }
    </>
  )
}



function WorkoutCard({ isActive, close, index, setIndex, workouts, tableRows }: { isActive: boolean, close: () => void, index: number, setIndex: (index: number) => void, workouts: WorkoutType[], tableRows: ArrayIterator<HTMLTableRowElement> }) {
  const [currentExercise, setCurrentExercise] = useState("");
  const [currentCountSets, setCurrenCountSets] = useState(0);
  const rowRef = useRef<HTMLTableRowElement>(null);

  const nextFunc = () => {
    const count = currentCountSets;

    if (count <= 1 && index + 1 < workouts.length) {
      setIndex(index + 1);
      return
    }

    if (count > 0) {
      setCurrenCountSets(count - 1);
    }

    if (count == 0 && (index + 1) == workouts.length) {
      setIndex(0);
      close();
    }
  }

  useEffect(() => {
    if (index < workouts.length) {
      setCurrentExercise(workouts[index].name);
      setCurrenCountSets(workouts[index].sets);
    }

    if (index > workouts.length) {
      setIndex(0);
      close();
    }

    const row = tableRows.next().value;

    if (rowRef.current) {
      rowRef.current.classList.remove("bg-[var(--ac-color)]")
    }

    if (row) {
      row.classList.add("bg-[var(--ac-color)]");
      rowRef.current = row;
    }
  }, [index])

  return (
    <>{isActive && (
      <Card className="fixed z-30 top-1/2 left-1/2 -translate-1/2 w-sm">
        <CardHeader>
          <div className="flex">
            <CardTitle className="basis-full text-xl">{currentExercise}</CardTitle>
            <Button size="icon" onClick={close} variant="destructive">
              <SkullIcon />
            </Button>
          </div>
          <Divider />
        </CardHeader>
        <CardContent className="grid grid-cols-6">
          <div className="col-start-2 col-span-4 text-2xl text-center font-semibold">
            {currentCountSets} x Sets
          </div>
          {/* complex block */}
          <Tracker workout={workouts[index]} />
          {/**/}
          {workouts[index].weight > 0 && (
            <div className="col-start-2 col-span-4 text-2xl text-center font-semibold">
              {workouts[index].weight} Kg
            </div>
          )}

        </CardContent>
        <CardAction className="w-full">
          <div className="flex mx-8 px-2 flex-row-reverse">
            <Button className="bg-[var(--ac-color)]" onClick={nextFunc}>
              Next
            </Button>
          </div>
        </CardAction>
      </Card>
    )}
    </>
  )
}

function Tracker({ workout }: { workout: WorkoutType }) {
  const type = workout.reps != undefined ? "reps" : "time";
  const starter = (workout.reps ? workout.reps : workout.time) || 0;
  const [value, setValue] = useState(starter);

  const [isCounterActive, setIsCounterActive] = useState(false)

  const counter = () => {
    let counter = value
    setIsCounterActive(true);
    const interval = setInterval(() => {
      if (counter > 0) {
        counter--
        setValue(counter);
      } else {
        clearInterval(interval)
        setIsCounterActive(false);
        setValue(starter)
      }
    }, type == "reps" ? 250 : 1000)
  }

  const Timer = () => {
    return (
      <div className="min-h-30 relative">
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-28 h-28 rounded-full bg-[var(--ac-color-two)]">
          {/* TODO:: replace woth fluid animation of it draining */}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center text-center text-2xl font-bold">
          {value}
          <span>sec's</span>
        </div>
      </div>
    )
  }

  // const reps = () => {
  //   // TODO: add a custom timer and then a active state
  //   return (
  //     <></>
  //   )
  // }

  return (
    <div className="col-start-2 col-span-4 flex flex-col min-h-10 px-1.5 py-1 rounded space-y-1.5">
      <div className="p-1">
        {
          type == "time" ?
            <Timer />
            :
            <div className="flex text-center justify-center text-2xl">
              {value} Reps
            </div>
        }
      </div>
      <Divider />
      <div className="flex w-full justify-center">
        <Button onClick={counter} disabled={isCounterActive}>
          {
            !isCounterActive ? (
              <>
                <PlayIcon /> Start
              </>
            ) : (
              <>
                <Loader2 className="animate-spin" />
                active
              </>
            )}
        </Button>
      </div>
    </div>
  )
}
