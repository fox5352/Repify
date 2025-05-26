import { Tabs, TabsList } from "@/components/ui/tabs"
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs"
import Posts from "./ProfilesPosts"

export default function ProfileBody({ id, isLoaded }: { id: string, isLoaded: boolean }) {

  if (!isLoaded) return null

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto py-1.5 px-2 min-h-11">
        <TabsTrigger className="h-full rounded data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950  dark:data-[state=active]:text-white" value="posts">Posts</TabsTrigger>
        <TabsTrigger className="h-full rounded data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950  dark:data-[state=active]:text-white" value="bookmarks">Bookmarks</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Posts id={id} />
      </TabsContent>
      <TabsContent value="bookmarks">
        <div>gyat</div>
      </TabsContent>
    </Tabs>
  )
}
