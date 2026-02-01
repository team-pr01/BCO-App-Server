import { Notification } from "../modules/notification/notification.model";
import cron from "node-cron";

export const cleanOldNotifications = async (): Promise<number> => {
  const now = new Date();

  // Calculate the date 2 months ago
  const twoMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 2,
    now.getDate()
  );

  // Find notifications created before or on that date
  const result = await Notification.deleteMany({
    createdAt: { $lte: twoMonthsAgo },
  });

  return result.deletedCount || 0;
};

// Runs every day at 9:00 AM
// export const registerOldNotificationCleanupCron = () => {
//   cron.schedule("0 9 * * *", async () => {
//     console.log("🗑 Running old notifications cleanup job at 9:00 AM");
//     try {
//       const deletedCount = await cleanOldNotifications();
//       console.log(`✅ Deleted ${deletedCount} old notifications`);
//     } catch (err) {
//       console.error("❌ Failed to delete old notifications:", err);
//     }
//   });
// };


export const registerOldNotificationCleanupCron = () => {
  // Runs every day at 2:19 AM
  cron.schedule("19 2 * * *", async () => {
    console.log("🗑 Running old notifications cleanup job at 2:19 AM");
    try {
      const deletedCount = await cleanOldNotifications();
      console.log(`✅ Deleted ${deletedCount} old notifications`);
    } catch (err) {
      console.error("❌ Failed to delete old notifications:", err);
    }
  });
};
