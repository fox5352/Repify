import { isPermissionGranted, requestPermission, sendNotification, type Options } from "@tauri-apps/plugin-notification";

export async function notification(options: Options) {
  let isPerm: boolean = await isPermissionGranted()
  console.log("isPermissionGranted:" + isPerm);

  if (!isPerm) {
    let req: NotificationPermission = await requestPermission();
    console.log("requestPermission:" + req);

    if (req == "granted") {
      sendNotification(options);
    }
  }

  if (isPerm) {
    sendNotification(options);
  }
}
