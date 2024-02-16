const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({

      firstName: {
        type: String,
        required: true,
    },
    lastName: { type: String, default: "" },
    phoneNumber: { type: Number,unique: true  },
    address: { type: String }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "admin",
    },
    status: {
        type: String, 
        enum: ["active", "inactive"], 
        default: "active", 
    },
});

const adminmodel = mongoose.model("adminModel", adminSchema);
module.exports = adminmodel;



