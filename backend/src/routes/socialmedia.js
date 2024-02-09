const express = require("express");
const router = express.Router();
const passport = require("passport");
// const axios = require("axios");
const handleYoutubeInteractions = require("../helper/youtube");
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

router.get("/auth/youtube/callback", function (req, res, next) {
  passport.authenticate("youtube", function (err, userInfo) {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      userId= userInfo.profile.id;

      res.redirect("http://localhost:3001/dashboard");
    }
  })(req, res, next);
});
router.get("/dashboard", async (req, res) => {
  const channelId = userId;
  if (channelId) {
    const fetchYouTubeComment = await handleYoutubeInteractions(channelId)
    return res.status(200).json({ fetchYouTubeComment });
  } else {
    return res.status(401).json({ message: "Channel ID not found" });
  }
});
module.exports = router;


