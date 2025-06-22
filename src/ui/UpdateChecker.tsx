import { useEffect, useRef } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { notification } from "@/hooks/notification";

export default function() {
  const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current) return;
    hasRun.current = true;

    const checkForUpdate = async () => {
      const url = "https://api.github.com/repos/fox5352/Repify/releases/latest";
      const res = await fetch(url);

      if (!res.ok) return;

      const currentVersion = (await getVersion()).split(".").map(Number);

      const data: {
        body: string;
        tag_name: string;
        name: string;
        html_url: string;
      } = await res.json();

      let dataVersion = data.tag_name.split("v")[1].split(".").map(Number);

      // Simple semver comparison
      if (
        dataVersion[1] > currentVersion[1] ||
        dataVersion[3] > currentVersion[3] ||
        dataVersion[5] > currentVersion[5]
      ) {
        await notification({
          title: `New update ${data.name}:${data.tag_name} available`,
          body: `${data.name}`,
        });
      }
    };

    checkForUpdate();
  }, []);
  return (<></>)
}
