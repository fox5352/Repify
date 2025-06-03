import { AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StateError } from ".."

interface BrutalistErrorProps {
  title: string
  message: string
  className?: string
}

const errorConfig = {
  warning: {
    icon: AlertTriangle,
    borderColor: "border-yellow-400",
    iconBg: "bg-yellow-400",
    accentBg: "bg-yellow-400/10",
  },
  info: {
    icon: Info,
    borderColor: "border-teal-400",
    iconBg: "bg-emerald-400",
    accentBg: "bg-teal-400/10",
  },
  error: {
    icon: X,
    borderColor: "border-rose-400",
    iconBg: "bg-[crimson]",
    accentBg: "bg-rose-400/10",
  },
}

export function ErrorCard({ title, className, message, severity }: BrutalistErrorProps & StateError) {
  const config = errorConfig[severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "relative border-4 border-zinc-950 bg-white shadow-[8px_8px_0px_0px_#18181b]",
        config.borderColor,
        className,
      )}
    >
      {/* Top accent bar */}
      <div className={cn("h-2", config.accentBg)} />

      {/* Main content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={cn("flex h-12 w-12 items-center justify-center border-2 border-zinc-950", config.iconBg)}>
            <Icon className="h-6 w-6 text-zinc-950" strokeWidth={3} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-black uppercase tracking-wider text-zinc-950 mb-2">{title}</h3>
            <p className="text-zinc-950 font-bold leading-tight">{message}</p>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="h-1 bg-zinc-950" />
    </div>
  )
}
//
// export default function Component() {
//   return (
//     <div className="min-h-screen bg-zinc-100 p-8 space-y-8">
//       <div className="max-w-2xl mx-auto space-y-8">
//         <h1 className="text-4xl font-black uppercase tracking-wider text-zinc-950 mb-8 text-center">
//           Brutalist Errors
//         </h1>
//
//         <BrutalistError
//           type="error"
//           title="System Failure"
//           message="Critical error detected. The operation could not be completed due to a server malfunction. Please contact support immediately."
//         />
//
//         <BrutalistError
//           type="warning"
//           title="Data Warning"
//           message="Your session will expire in 5 minutes. Save your work to prevent data loss and continue working."
//         />
//
//         <BrutalistError
//           type="info"
//           title="Update Available"
//           message="A new version of the application is available. Update now to access the latest features and security improvements."
//         />
//       </div>
//     </div>
//   )
// }
