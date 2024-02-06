const express = require("express");
const router = express.Router();
const passport = require("passport");
// const axios = require("axios");

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

router.get(
  "/auth/youtube/callback",
  passport.authenticate("youtube"),
  (req, res) => {
    console.log(req.user);

    res.redirect("/login");
  }
);

router.get("/login", async (req, res) => {
  try {
    const user = await req.user; // Wait for user data to be available
    res.json(user);
  } catch (error) {
    console.error(error);
    res.send("unauthorized");
  }
});
module.exports = router;
