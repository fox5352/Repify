import { useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { notification } from "@/hooks/notification";

export default function() {

  useEffect(() => {
    const checkForUpdate = async () => {
      const url = "https://api.github.com/repos/fox5352/Repify/releases/latest";

      const res = await fetch(url);

      if (!res.ok) {
        return;
      }
      const currentVersion = await getVersion();

      const data: { body: string, tag_name: string, name: string, html_url: string } = await res.json();

      if (data.tag_name[1] > currentVersion[1] || data.tag_name[3] > currentVersion[3] || data.tag_name[5] > currentVersion[5]) {
        notification({
          title: `New update ${data.name}`,
          body: `${data.name}`
        })

      }
    }
    checkForUpdate();
  }, [])

  return (<></>)
}
