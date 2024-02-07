const mongoose = require("mongoose");
const customer = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  socialMedia:{
    youtube:{
        type: String,
        default:"",
    },
  },
  plan: {
    type: String,
    default:"",
  },
  status: {
    type: String,
    enums: ["active", "inactive"],
    default: "active",
  },
});
const customermodel = mongoose.model("customerModel",customer);
module.exports = customermodel;