import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Filter } from "bad-words";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function acn(active: boolean, ...inputs: ClassValue[]) {
  return active ? twMerge(clsx(inputs)) : ""
}

export function genId(): string {
  return `${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}`
}

export function isCleanText(text: string): boolean {
  const filter = new Filter();

  return !filter.isProfane(text)
}

export function filterText(text: string): string {
  const filter = new Filter();

  filter.placeHolder = "uwu";

  return filter.clean(text);
}
