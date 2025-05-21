import type { ClassValue } from "clsx";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ChangeEvent } from "react";

export default function InputWithLabel(
  { label,
    name,
    type,
    placeholder,
    labelClassName,
    onChange,
    value,
  }: {
    label: string,
    name: string
    type: string
    placeholder?: string,
    labelClassName?: ClassValue,
    inputClassName?: ClassValue,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    value?: any
  }
) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
      <Label className={`text-xl ${cn(labelClassName)}`}>{label}:</Label>
      <Input
        id="title"
        className="text-white valid:border-emerald-500"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        pattern="^[a-zA-Z0-9\s]{8,180}+$"
        required />
    </div >
  )
}
