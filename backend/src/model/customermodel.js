// const mongoose = require("mongoose");
const moment = require("moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    // userName: {
    //   type: String,
    //   default: "",
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    linkedAccount: {
      youtube: {
        type: String,
        default: "",
      },
    },

    usage: {
      commentReplies: {
        type: Number,
        default: 0,
      },
      analysesConducted: {
        type: Number,
        default: 0,
      },
    },
    
    // subscriptionPlan: {
    //   type: Schema.Types.ObjectId,
    //   ref: "SubscriptionPlan",
    // },

    extraPackagePurchaseData: {
      type: String,
      default: "",
    },
    status: {
      type: String,

      enum: ["active", "inactive"],
      default: "active",
    },
    lastActiveDate: {
      type: String,
      default: moment(new Date()).format("DD/MM/YYYY HH:mm"),
    },

    feedbackSection: {
      type: String,
      default: "",
    },
    renewalDate: {
      type: Date,
      default: null, // Replace null with your default date value if needed
    },

    paymentHistory: [{ type: String, default: "" }],

    recentActivityInsights: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);
const customermodel = mongoose.model("customerModel", customer);
module.exports = customermodel;
