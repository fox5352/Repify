import { useEffect, useState } from "react";
import ProfileSection from "./ProfileHeader";
import SkeletionBox from "@/components/ui/SkeletonBox";
import { getUser, type UserData } from "@/model/user.model";
import ProfileBody from "./ProfileBody";

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoaded, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(false);
        const user = await getUser();

        if (!user) throw new Error("User not found");

        setUser(user);
      } catch (error) {
        console.error(error);
        // TODO: add trigger and fail stat on page!
      } finally {
        setIsLoading(true);
      }
    }

    fetchData();
  }, [])

  return (
    <section className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      {
        !isLoaded ?
          <SkeletionBox /> :
          user && (
            <ProfileSection hasImage={user.hasImage} imageUrl={user.imageUrl} username={user.username} activeDays={user.activeDays} bookmarksLength={user.bookmarksLength} />
          )
      }
      {user &&
        <ProfileBody id={user?.id} isLoaded={isLoaded} />}
    </section>
  )
}
