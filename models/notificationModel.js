const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
});

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
