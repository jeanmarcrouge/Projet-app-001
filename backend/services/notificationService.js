const cron = require("node-cron");
const { getDeadlinesDueInDays } = require("../models/deadlineModel");

const startDeadlineNotificationJob = () => {
  // Every day at 09:00 server local time (configure timezone if required).
  cron.schedule("0 9 * * *", async () => {
    try {
      const upcoming = await getDeadlinesDueInDays(7);

      if (upcoming.length === 0) {
        console.log("[cron] No deadlines due in 7 days.");
        return;
      }

      upcoming.forEach((deadline) => {
        const action = deadline.action_text || "Check your dashboard for the required action.";
        console.log(
          `[cron] Upcoming deadline: ${deadline.title}\n` +
            `Company: ${deadline.company_name}\n` +
            `Action: ${action}\n` +
            `Date: ${deadline.due_date}`
        );
      });
    } catch (error) {
      console.error("[cron] Failed to process deadline notifications", error);
    }
  });
};

module.exports = {
  startDeadlineNotificationJob,
};
