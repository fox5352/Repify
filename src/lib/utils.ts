import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function acn(active: boolean, ...inputs: ClassValue[]) {
  return active ? twMerge(clsx(inputs)) : ""
}

export function genId(): string {
  return `${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}`
}
