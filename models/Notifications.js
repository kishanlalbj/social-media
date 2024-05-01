const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'post'
    },
    type: {
      type: String,
      enum: ['like', 'comment'],
      required: true
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeseries: true,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
