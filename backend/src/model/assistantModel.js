const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const assistantInstructionModel = mongoose.model(
  "assistantInstructions",
  assistantSchema
);

module.exports = assistantInstructionModel;
