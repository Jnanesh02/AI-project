const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: "",
  },
});

const emoji = mongoose.model("emoji", emojiSchema);

module.exports = emoji;
