const express = require("express");
const router = express.Router();
const passport = require("passport");
// const axios = require("axios");
const handleYoutubeInteractions = require("../helper/youtube");

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
      req.session.user = userInfo.profile.id;
      req.session.save();

      res.redirect("/success");
    }
  })(req, res, next);
});
router.get("/success", async (req, res) => {
  if (req.session.user !== null) {
    const channelId = req.session.user;
    return res.status(200).json({ message: "Success", userId: channelId });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;


