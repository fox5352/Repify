import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Calendar, Trophy, User } from "lucide-react"

interface ProfileProps {
  username: string
  hasImage: boolean
  imageUrl: string
  bookmarksLength: number
  activeDays: number
}

export default function ProfileSection({
  username = "johndoe",
  hasImage = true,
  imageUrl = "https://github.com/shadcn.png",
  bookmarksLength = 42,
  activeDays = 128,
}: ProfileProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Calculate user level based on active days
  const userLevel = Math.floor(activeDays / 30) + 1

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="h-24 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
          <CardHeader className="relative pb-0">
            <div className="absolute -top-12 left-6 ring-4 ring-background">
              <Avatar className="h-24 w-24 shadow-md">
                {hasImage ? (
                  <AvatarImage src={imageUrl || "/placeholder.svg"} alt={username} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-2xl">
                    {getInitials(username)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="pt-14 pl-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{username}</h2>
                <Badge
                  variant="outline"
                  className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                >
                  <Trophy className="h-3 w-3 mr-1" />
                  Level {userLevel}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Member since {new Date().getFullYear() - Math.floor(activeDays / 365)}
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-2 mb-2">
                  <Bookmark className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-2xl font-bold">{bookmarksLength}</span>
                <span className="text-xs text-muted-foreground">Bookmarks</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2 mb-2">
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-2xl font-bold">{activeDays}</span>
                <span className="text-xs text-muted-foreground">Active Days</span>
              </motion.div>
            </div>

            {/* TODO: add once the data suports it
            <div className="mt-8 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Activity Level</span>
                <span className="text-sm font-medium">
                  {activeDays > 100 ? "Power User" : activeDays > 50 ? "Regular" : "Beginner"}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (activeDays / 200) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full"
                ></motion.div>
              </div>
            </div>
            */}


          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
