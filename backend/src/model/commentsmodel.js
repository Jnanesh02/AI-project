const mongoose = require("mongoose");
const videoIdSchema = new mongoose.Schema({
  videoId: {
    type: String,
    default: "",
  },
  nextPageToken: {
    type: String,
    default: "",
  },
  comments: [
    {
      commentId: {
        type: String,
        default: "",
      },
      usercomments: {
        type: String,
        default: "",
      },
      chatGpt: {
        type: String,
        default: "",
      },
      chatGptReplied: {
        type: Boolean,
        default: false,
      },
      Status: {
        enums: ["Approved", "Pending"],
        type: String,
        default: "Pending",
      },
    },
  ],
});
const commentsSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customermodels",
  },
  channels: [
    {
      channelId: {
        type: String,
        default: "",
      },
      videos: [videoIdSchema],
    },
  ],
});
const commentmodel = mongoose.model("commentsSchema", commentsSchema);
module.exports = commentmodel;
