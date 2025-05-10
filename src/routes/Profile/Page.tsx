import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import ProfileSection from "./ProfileHeader";
import Divivder from "@/ui/Divider";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletionBox from "@/components/ui/SkeletonBox";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userData, setUserData] = useState<{
    username: string
    hasImage: boolean
    imageUrl: string
    bookmarksLength: number
    activeDays: number
  } | null>(null)

  useEffect(() => {
    if (!user) return;
    const test = {
      username: "Fox5352",
      hasImage: false,
      imageUrl: "",
      bookmarksLength: 3,
      activeDays: 1
    };
    setUserData(test)

  }, [])

  return (
    <section className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      {
        !isLoaded ? <SkeletionBox /> :
          userData && (
            <ProfileSection hasImage={userData.hasImage} imageUrl={userData.imageUrl} username={userData.username} activeDays={userData.activeDays} bookmarksLength={userData.bookmarksLength} />
          )
      }
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia facilis ducimus dolorem cum rem neque nobis eveniet, libero quia ut ipsa molestias obcaecati ab accusamus, facere earum non quis debitis.</div>
    </section>
  )
}
