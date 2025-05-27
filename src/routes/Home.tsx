import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmarkers } from "@/ui/Bookmarkers";
import { Explore } from "@/ui/Explore";

export default function Home() {
  return (
    <Tabs defaultValue="explore" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto py-1.5 px-2 min-h-11">
        <TabsTrigger className="h-full rounded data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950  dark:data-[state=active]:text-white" value="explore">Explore</TabsTrigger>
        <TabsTrigger className="h-full rounded data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950  dark:data-[state=active]:text-white" value="bookmarks">Bookmarked</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <Explore />
      </TabsContent>
      <TabsContent value="bookmarks">
        <Bookmarkers />
      </TabsContent>
    </Tabs>
  );
}
