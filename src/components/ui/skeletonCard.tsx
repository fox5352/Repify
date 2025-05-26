import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col w-fit space-y-3 p-1 rounded-md shadow-md dark:shadow-none shadow-stone-200 ${cn(className)}`}>
      <Skeleton className="h-[125px] min-w-[250px] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-col space-y-2 w-full">
        <Skeleton className="w-4/5 h-4 min-w-[250px] bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="w-4/5 h-4 min-w-[250px] bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  )
}
