import { useRef, useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function Workout({ index, id, update, remove }: { index: number, id: string, update: (id: string, name: string, value: any) => void, remove: () => void }) {
  const typeRef = useRef<HTMLInputElement>(null)
  const [type, setType] = useState<"reps" | "time">("reps");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    update(id, "index", index);
    update(id, event.target.name, event.target.value);
  }
  const toggleType = () => {
    if (typeRef.current == null) return;

    setType(prev => {
      const newMode = prev == "time" ? "reps" : "time"
      update(id, prev, undefined);
      update(id, newMode, typeRef.current?.value)
      return newMode;
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 p-2 text-white bg-zinc-950 rounded-lg">
      {/* name */}
      <div className="flex gap-1.5">
        <Label className="text-lg">Name</Label>
        <Input id={`${id}-name`} className="text-white valid:border-emerald-500" placeholder="name" type="text" name="name" onChange={changeHandler} pattern="^[a-zA-Z0-9\s]{3,40}$" required />
      </div>
      {/* sets */}
      <div className="flex gap-1.5">
        <Label className="text-lg">Sets</Label>
        <Input className="text-white valid:border-emerald-500" placeholder="sets" type="number" name="sets" onChange={changeHandler} min={1} max={50} pattern="^[0-9]{1,2}$" required />
      </div>
      {/* reps or time */}
      <div className="col-span-2 sm:col-span-1 flex gap-1.5">
        <Button className="border border-white" onClick={toggleType} size="icon" type="button">
          <ArrowUpDown />
        </Button>
        <Label className="text-lg">{type == "time" ? "Time" : "Reps"}</Label>
        <Input ref={typeRef} className="text-white valid:border-emerald-500" placeholder={type == "reps" ? "reps" : "duration"} type="number" name={type == "reps" ? "reps" : "time"} onChange={changeHandler} min={0} max={300} pattern="^[0-9]{1,3}$" required />
      </div>
      {/* weight*/}
      <div className="col-span-2 sm:col-span-1 flex gap-1.5">
        <Label className="text-lg">Weight</Label>
        <Input className="w-full text-white valid:border-emerald-500" placeholder="weight in kg" type="number" name="weight" onChange={changeHandler} min={0} max={900} pattern="^[0-9]{1,3}$" required />
      </div>
      <Button className="" style={{
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
