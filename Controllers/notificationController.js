const NotificationModel = require("../models/notificationModel");

class NotificationController {
  //! Create Notification
  async createNotification(notification) {
    const newNotification = new NotificationModel(notification);

    await newNotification.save();

    return newNotification;
  } //! Get Notifications for User

  async getNotificationsForUser(userId) {
    const notifications = await NotificationModel.find({ receiver: userId });

    return notifications;
  } //! Mark Notification as Read

  async markNotificationAsRead(notificationId) {
    const notification = await NotificationModel.findById(notificationId);

    notification.status = "read";

    await notification.save();
  }
}

module.exports = NotificationController;
