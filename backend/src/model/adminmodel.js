const mongoose = require('mongoose');
 
const adminSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true,
      },
      lastName: { type: "string", default: "" },
      phoneNumber: { type: "string" },
      Address: { type: "string" },
      email: { type: "string", required: true, unique: true },
      password: { type: "string", required: true },
      role: {
        type: "string",
        default: "admin",
      },
      status: {
        type: "string",
        enum: ["active", "inactive"], 
        default: "active", 
      },
});
const adminModel = mongoose.model("adminSchema", adminSchema);
module.exports = adminModel;