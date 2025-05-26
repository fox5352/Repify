import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletionBox() {
  return (
    <>
      <div className="flex gap-2">
        <Skeleton className="h-[125px] basis-2/6 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-[125px] basis-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <Skeleton className="h-[125px] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-row-reverse gap-2">
        <Skeleton className="h-[125px] basis-2/6 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-[125px] basis-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>

    </>
  )
}
