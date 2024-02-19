const mongoose = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema({
    subscriptionPlanName: { type: String, default: 'free',unique: true },
    price: { type: Number, default: 0 },
    durationOfPlan: { type: String, default: '' },
    features: [{ type: String, default: '' }],
    // role: { type: Number, required: true, default: 0, enum: [0, 1] } // 0 for customer, 1 for admin
});

const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);

module.exports = SubscriptionPlanModel;