import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Label } from "@radix-ui/react-label";

import { isCleanText } from "@/lib/utils";

import Divider from "@/ui/Divider";
import { Button } from "@/components/ui/button";

import Workout from "./components/Workout";
import InputWithLabel from "./components/InputWithLabel";
import { useNotify } from "@/ui/Notify";
import { updateWorkoutRoutine, uploadWorkoutRoutine, type WorkoutRoutine, type WorkoutType } from "@/model/workoutroutine.model";
import { redirect, useLocation } from "react-router";

interface WorkoutRotine {
  id?: string;
  title: string;
  workouts: Record<string, WorkoutType>;
};

export default function Create() {
  // page state
  const [mode, setMode] = useState<"create" | "update">("create");
  const { trigger } = useNotify();
  const { state, search } = useLocation();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutRotine>({ title: "", workouts: {} });

  const lengthOfWorkouts = useMemo(() =>
    Object.keys(workoutPlan.workouts).length
    , [workoutPlan.workouts])

  const addWorkout = () => {
    const id = `${Math.round(Math.random() * 999)}-${Math.round(Math.random() * 999)}-${Math.round(Math.random() * 999)}`;

    setWorkoutPlan(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [id]: {
          sets: 0,
          name: "",
          weight: 0,
        }
      }
    }));
  }

  const removeWorkout = (id: string) => {
    const newSet = Object
      .entries(workoutPlan.workouts)
      .reduce((prev, [currId, data]) => {
        if (id == currId) {
          return { ...prev };
        } else {
          return {
            ...prev,
            [currId]: data
          }
        }
      }, {});

    setWorkoutPlan(prev => ({
      ...prev,
      workouts: newSet
    }))
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleChange = (id: string, name: string, value: any) => {
    setWorkoutPlan(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [id]: {
          ...prev.workouts[id],
          [name]: value
        }
      }
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: leng of workouls listed about 0 and filter bad workds
    if (!isCleanText(workoutPlan.title)) {
      trigger("Title has works thats not allowed", "error");
      document.getElementById("title")?.focus();
      return;
    }

    if (lengthOfWorkouts == 0) {
      trigger("You must have at least one workout", "info");
      return;
    }

    for (const [id, data] of Object.entries(workoutPlan.workouts)) {
      if (!isCleanText(data.name)) {
        trigger("Workouts name has words thats not allowed", "error");
        document.getElementById(`${id}-name`)?.focus();
        return;
      }
    }

    const cleanedWorkoutRoutine: WorkoutRoutine = {
      title: workoutPlan.title,
      workouts: []
    };

    const data = Object.keys(workoutPlan.workouts).map(key => ({
      ...workoutPlan.workouts[key],
    }))
      // @ts-ignore
      .sort((a, b) => a.index - b.index);

    cleanedWorkoutRoutine.workouts.push(...data)

    let success: boolean = false;

    if (mode == "update" && workoutPlan.id) {
      success = await updateWorkoutRoutine(workoutPlan.id, cleanedWorkoutRoutine);
    } else {
      success = await uploadWorkoutRoutine(cleanedWorkoutRoutine)
    }

    if (!success) {
      trigger("faild to upload workout routine", "error")
      return
    }
    setWorkoutPlan({ title: "", workouts: {} });

    // TODO: redirect to new upload
    redirect("/");
  }

  useEffect(() => {
    let params = new URLSearchParams(search);

    let data = state as WorkoutRoutine & { id: string };
    if (params.has("update") && data != null) {
      setMode("update");
      const workout = {
        id: data.id,
        title: data.title,
        workouts: data.workouts.reduce((prev, curr, index) => {
          return {
            ...prev,
            [index]: curr
          }
        }, {})
      };

      setWorkoutPlan(workout);
    } else {
      setMode("create")
    }

  }, [search])


  return (
    <section className="mt-4 rounded-md border-x-2 min-h-[460px] shadow-stone-500 shadow-lg">
      <form className="md:min-h-[460px] p-4" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-2 md:min-h-[460px] max-w-[100%] overflow-hidden">
          <legend className="text-2xl">Work out plain</legend>

          <div className="px-2 text-white rounded-lg bg-zinc-950">
            <InputWithLabel label="Title" name="title" placeholder="Gains Bro" type="text" value={workoutPlan.title} onChange={handleInput} />
          </div>
          <Divider />

          {
            lengthOfWorkouts > 0 && Object.keys(workoutPlan.workouts).map((id, index) => {
              return <Workout key={id} id={id} update={handleChange} remove={() => { removeWorkout(id) }} index={index} data={mode == "update" ? {
                weight: workoutPlan.workouts[id].weight,
                name: workoutPlan.workouts[id].name,
                reps: workoutPlan.workouts[id].reps,
                sets: workoutPlan.workouts[id].sets,
                time: workoutPlan.workouts[id].time
              } : undefined} />
            })
          }
          {
            lengthOfWorkouts > 0 && <Divider />
          }
          <div>
            <Button type="button" onClick={addWorkout}>Add Workout</Button>
          </div>

          <Divider />
          <div className="flex justify-between items-center">
            <Label className="text-xl font-bold">Submit Routine: </Label>
            <Button type="submit">Submit</Button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}
