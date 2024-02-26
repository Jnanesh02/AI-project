const express = require("express");
const {
  getChanneldetails,
  getVideosList,
  getCommentsForVideos,
} = require("../../helper/youtubeFunctions");
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
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
