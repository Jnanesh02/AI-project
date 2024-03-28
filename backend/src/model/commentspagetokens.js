const mongoose = require("mongoose");

const pageTokenSchema = new mongoose.Schema({
  videoId: {
    type: String,
    default: "",
  },
  nextPageToken: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("pageTokenSchema", pageTokenSchema);
