const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");
const handleYoutubeInteractions = require("../helper/youtube");
const Customer = require("../model/customermodel");
const {
  getVideosList,
  getCommentsForVideos,
} = require("../helper/youtubeFunctions");
const getChannelDetails =
  require("../helper/youtubeFunctions").getChanneldetails;

const {
  verifyAccessToken,
  generateNewAccessToken,
} = require("../helper/tokens");
var userId;
// let id;
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

// youtube login api
router.get("/auth/youtube", (req, res, next) => {
  try {
    const id = req.query.id;
    req.session.dbId = id;
    // console.log("inside auth youtube: ", id);
    passport.authenticate("youtube")(req, res, next);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(err.message);
  }
});

router.get("/auth/youtube/callback", function (req, res, next) {
  passport.authenticate("youtube", async function (err, userInfo) {
    // console.log(userInfo);
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      const id = req.session.dbId;
      console.log("id inthe callback", id);
      // userId = userInfo.profile.id;
      let accessToken = userInfo.accessToken;
      let refreshToken = userInfo.refreshToken;
      const customer = await Customer.findById(id);
      console.log("customer data: ", customer);
      customer.channelId = userInfo.profile.id;
      customer.accessToken = accessToken;
      customer.refreshToken = refreshToken;
      await customer.save();
      // console.log("accessToken before ", userInfo.accessToken);
      // console.log("refresh token", userInfo.refreshToken);
      console.log(userInfo);

      res.redirect("http://localhost:3001/dashboard");
    }
  })(req, res, next);
});
router.get("/dashboard", async (req, res) => {
  try {
    const id = req.query.userId;
    // console.log("inside dashboard,", id);
    const customer = await Customer.findById(id);
    const channelId = customer.channelId;
    console.log("channel id", channelId);

    // console.log("customer data in dashboard route", customer);
    const accessToken = customer.accessToken;
    const refreshToken = customer.refreshToken;
    // console.log("tokens in dashboard route", accessToken, refreshToken);
    let validAccessToken = null;
    try {
      let isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        validAccessToken = accessToken;
      } else {
        validAccessToken = await generateNewAccessToken(refreshToken);
        console.log("new Token generated:", validAccessToken);
      }
    } catch (err) {
      console.error(err.message);
    }

    if (channelId) {
      console.log("inside if channel id block");
      const fetchYouTubeComment = await handleYoutubeInteractions(
        validAccessToken,
        channelId
      );

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
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error.message);
  }
});
module.exports = router;
