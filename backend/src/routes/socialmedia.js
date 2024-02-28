const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");
const handleYoutubeInteractions = require("../helper/youtube");
const {
  getVideosList,
  getCommentsForVideos,
} = require("../helper/youtubeFunctions");
const getChannelDetails =
  require("../helper/youtubeFunctions").getChanneldetails;
let userId;
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/success",
    failureRedirect: "/login",
  })
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/success",
    failureRedirect: "/login",
  })
);

router.get("/auth/youtube", passport.authenticate("youtube"));

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}
router.get("/auth/youtube/callback", function (req, res, next) {
  passport.authenticate("youtube", async function (err, userInfo) {
    // console.log(userInfo);
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      // console.log("inside youtube callback", userInfo);

      userId = userInfo.profile.id;
      console.log("accessToken before ", userInfo.accessToken);
      try {
        let accessToken = await refreshAccessToken(userInfo.refreshToken);
        console.log("refresh Token", accessToken);
      } catch (err) {
        console.log(err.message);
      }

      res.redirect("http://localhost:3001/dashboard");
    }
  })(req, res, next);
});
router.get("/dashboard", async (req, res) => {
  const channelId = userId;
  // console.log("inside  dashboard route", req.user);
  if (channelId) {
    const fetchYouTubeComment = await handleYoutubeInteractions(channelId);
    // const channelDetails = await getChannelDetails(channelId);
    // const Videos = await getVideosList(channelId);
    // const videoId = "Zj7IJLxUf7M";

    // const CommentsForVideos = await getCommentsForVideos(videoId, 50);

    // console.log("channel details", channelDetails);
    // console.log("videos", Videos[0].snippet.thumbnails);
    // console.log("comments for videos ", CommentsForVideos);

    return res.status(200).json({ fetchYouTubeComment });
  } else {
    return res.status(401).json({ message: "Channel ID not found" });
  }
});
module.exports = router;
