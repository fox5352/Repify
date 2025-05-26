import { useEffect, useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Trash } from "lucide-react";

export default function Workout({ index, id, update, remove }: { index: number, id: string, update: (id: string, name: string, value: any) => void, remove: () => void }) {
  const [type, setType] = useState<"reps" | "time">("reps");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    update(id, "index", index);
    update(id, event.target.name, event.target.value);
  }
  const toggleType = () => {
    update(id, type, undefined);
    setType(prev => prev == "time" ? "reps" : "time");
  }

  return (
    <div className="flex gap-0.5 p-2 text-white bg-zinc-950 rounded-lg">
      <Input className="text-white valid:border-emerald-500" placeholder="sets" type="number" name="sets" onChange={changeHandler} min={1} max={50} pattern="^[0-9]{1,2}$" required />
      <Input id={`${id}-name`} className="text-white valid:border-emerald-500" placeholder="name" type="text" name="name" onChange={changeHandler} pattern="^[a-zA-Z0-9\s]{3,40}$" required />
      <Button className="border border-white" onClick={toggleType} size="icon" type="button">
        <ArrowUpDown />
      </Button>
      <Input className="text-white valid:border-emerald-500" placeholder={type == "reps" ? "reps" : "duration"} type="number" name={type == "reps" ? "reps" : "time"} onChange={changeHandler} min={0} max={300} pattern="^[0-9]{1,3}$" required />
      <Input className="text-white valid:border-emerald-500" placeholder="weight in kg" type="number" name="weight" onChange={changeHandler} min={0} max={900} pattern="^[0-9]{1,3}$" required />
      <Button style={{
        backgroundColor: "var(--error-color)"
      }}
        type="button"
        size="icon"
        onClick={remove}
      >
        <Trash />
      </Button>
    </div>
  )
}
