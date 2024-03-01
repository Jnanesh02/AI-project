const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

// api key
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_KEY,
});

const assistantConfig = {
  name: "dummy assistant",
  instructions: "",
  tools: [{ type: "code_interpreter" }],
  model: "gpt-4-turbo-preview",
};

const createAssistant = async (assistantConfig) => {
  const assistant = await openai.beta.assistants.create(assistantConfig);
  return assistant;
};

const updatedInstructions = {
  tone: "creative",
  style: "concise",
  //   channelDesc,
};
const updateAssistant = async (assistantId, updatedInstructions) => {
  const assistant = await openai.beta.assistants.update(
    assistantId,
    updatedInstructions
  );
  return assistant;
};

// for updating the instructions from the frontend

router.post("/updateInstructions", async (req, res) => {
  //first we need to create the assistant
  const assistant = await createAssistant(assistantConfig);
  return res.json(assistant);
});

module.exports = router;
