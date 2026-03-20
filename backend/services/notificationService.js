const cron = require('node-cron');
const { getDeadlinesForNotification } = require('../models/deadlineModel');

async function sendUpcomingDeadlineNotifications() {
  const items = await getDeadlinesForNotification(7);

  if (items.length === 0) {
    console.log('[notifications] No deadlines in 7 days');
    return;
  }

  items.forEach((deadline) => {
    // MVP mode: this can be replaced by a real email provider later.
    const dueDate = new Date(deadline.due_date).toISOString().split('T')[0];
    console.log('------------------------');
    console.log(`Upcoming deadline: ${deadline.title}`);
    console.log(`Company: ${deadline.company_name}`);
    console.log(`Action: ${deadline.action_text || 'Review details in your dashboard'}`);
    console.log(`Date: ${dueDate}`);
    console.log('------------------------');
  });
}

function startDeadlineNotifications() {
  cron.schedule('0 8 * * *', async () => {
    try {
      await sendUpcomingDeadlineNotifications();
    } catch (error) {
      console.error('[notifications] Cron failed', error);
    }
  });

  console.log('[notifications] Daily cron scheduled at 08:00');
}

module.exports = {
  startDeadlineNotifications,
  sendUpcomingDeadlineNotifications,
};
