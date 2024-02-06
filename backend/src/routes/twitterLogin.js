const express = require("express");
const OAuth = require("oauth").OAuth;
const Twitter = require("twitter");
const tweetActions = require("../actions/tweetActions");

const router = express.Router();

const consumerKey = process.env.TWITTER_API_KEY;
const consumerSecret = process.env.TWITTER_API_SECRET;

const oauth = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  consumerKey,
  consumerSecret,
  "1.0A",
  "http://localhost:3000/auth/twitter/callback",
  "HMAC-SHA1"
);

router.get("/", (req, res) => {
  // Step 1: Get request token
  oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
    if (error) {
      res.status(500).send("Error getting OAuth request token.");
    } else {
      // Redirect the user to Twitter for authentication, including write permissions
      res.redirect(
        `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}&x_auth_access_type=write`
      );
    }
  });
});

router.get("/callback", (req, res) => {
  // Step 3: Exchange request token for access token
  const { oauth_token, oauth_verifier } = req.query;
  oauth.getOAuthAccessToken(
    oauth_token,
    null,
    oauth_verifier,
    (error, oauthAccessToken, oauthAccessTokenSecret) => {
      if (error) {
        res.status(500).send("Error getting OAuth access token.");
      } else {
        // Create Twitter client with access token and secret
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret=oauthAccessTokenSecret;
        res.status(200).send("Successfully authenticated with Twitter!");
        // res.status(200).redirect("/fetch-and-reply");
      }
    }
  );
});

router.get("/fetch-and-reply", async (req, res) => {
  const { username } = req.query; // Get inputs from query parameters
  const replyText = "hello world";
  try {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      access_token_key: req.session.oauthAccessToken,
      access_token_secret: req.session.oauthAccessTokenSecret,
    });

    await tweetActions(client, username, replyText);
    res.send("Tweets fetched and replied to successfully!");
  } catch (error) {
    res.status(500).send("Error fetching or replying to tweets");
    console.error(error);
  }
});

module.exports = router;
