const mongoose = require("mongoose");
const videoIdSchema = new mongoose.Schema({
  videoId: {
    type: "string",
    default: "",
    
  },
  comments: [
    {
      usercomments: {
        type: "string",
        default: "",
      },
      chatGpt: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
const commentsSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customermodels",
  },
  channelId: [videoIdSchema],
  commmentsReplied: {
    type: Number,
    default: 0,
  },
});
const commentmodel = mongoose.model("commentsSchema", commentsSchema);
module.exports = commentmodel;

