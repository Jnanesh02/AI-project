const express = require("express");
const {
  getChanneldetails,
  getVideosList,
  getCommentsForVideos,
} = require("../../helper/youtubeFunctions");

const { createAssistant } = require("../../helper/chatgpt");

const router = express.Router();

router.get("/channel/:channelId", async (req, res) => {
  try {
    const channel = await getChanneldetails(req.params.channelId);
    res.json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/channel/videos/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const videos = await getVideosList(channelId);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/video/get-comments/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;

    const { numOfComments, channelId, userId } = req.body;

    const videos = await getCommentsForVideos(videoId, numOfComments);
    console.log("234", videos);

    console.log("456", videos[0].comments);

    // we need to save the comments here
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});

router.get("/video/get-comment-replies", async (req, res) => {
  try {
  } catch (err) {}
});

// to create a seperate assistant for the user
const assistantConfig = {
  name: "test",
  instructions: "",
  // tools: [{ type: "code_interpreter" }],
  model: "gpt-4-turbo-preview",
};

// console.log(assistantConfig);+

router.post("/createassistant", async (req, res) => {
  try {
    const instructions = JSON.stringify(req.body);
    console.log("body", req.body);
    console.log(instructions);
    assistantConfig.name = "testing assistant";
    assistantConfig.instructions = instructions;
    const assistant = await createAssistant(assistantConfig);
    console.log(assistant);
    return res.json(assistant);
    // return res.json(instructions);
  } catch (err) {
    console.log(err.message);
    return res.json(err.message);
  }
});

module.exports = router;
