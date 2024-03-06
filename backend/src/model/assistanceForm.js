const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    assistanceInstructionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssistanceInstruction',
    },
    
    emojis: { type: String, required: true },
    channelDescription: { type: String, required: true },
    // ... other fields specific to your form
});

// Create the Form model
const FormModel = mongoose.model('Form', formSchema);
module.exports = FormModel;
