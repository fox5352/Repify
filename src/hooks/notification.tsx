import { isPermissionGranted, requestPermission, sendNotification, type Options } from "@tauri-apps/plugin-notification";

export async function notification(opt: Options) {
  let isPerm: boolean = await isPermissionGranted()
  console.log("isPermissionGranted:" + isPerm);

  let options: Options = {
    ...opt,
    icon: "ic_notification",
    largeIcon: "ic_notification"
  }


  if (!isPerm) {
    console.log("requesting permission");
    let req: NotificationPermission = await requestPermission();
    console.log("requestPermission:" + req);

    if (req == "granted") {
      console.log("granted");
      sendNotification(options);
    }
  }

  if (isPerm) {
    console.log("granted");
    sendNotification(options);
  }
}
