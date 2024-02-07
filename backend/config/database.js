const mongoose = require("mongoose");

exports.connect = (req, res) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.DB_PORT)
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch(() => {
      console.log("failed to connect");
    });
};