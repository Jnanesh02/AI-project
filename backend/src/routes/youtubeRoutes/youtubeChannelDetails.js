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

router.get("/channel/:channelId/videos", async (req, res) => {
  try {
    const videos = await getVideosList(req.params.channelId);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/video/:videoId/comments", async (req, res) => {
    try{

        const videos= await getCommentsForVideos()
    }
    catch(err){

    }
});
