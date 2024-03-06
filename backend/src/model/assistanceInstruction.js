const mongoose = require("mongoose");

const AssistanceInstructionSchema = new mongoose.Schema({
    tone: { type: String, required: true },
    description: { type: String, default: '' },
});

const AssistanceInstructionModel = mongoose.model("AssistanceInstruction", AssistanceInstructionSchema);

module.exports = AssistanceInstructionModel;
