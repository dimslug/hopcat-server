const router = require("express").Router();
const NotificationController = require("./controllers/notificationController");

// Get all notifications for a user
router.get("/notifications/:userId", async (req, res) => {
  const userId = req.params.userId;

  const notifications = await NotificationController.getNotificationsForUser(
    userId
  );

  res.json(notifications);
});

// Mark a notification as read
router.put("/notifications/:notificationId/mark-as-read", async (req, res) => {
  const notificationId = req.params.notificationId;

  await NotificationController.markNotificationAsRead(notificationId);

  res.sendStatus(200);
});

module.exports = router;
