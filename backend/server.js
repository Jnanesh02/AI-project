const express = require("express");
const { connect } = require("./config/database");
require("dotenv").config();
const {
  getChatGPTResponse,
  assistantResponse,
  sentimentAnalysis,
} = require("./src/helper/chatgpt");
const cors = require("cors");
const twitterClient = require("./src/routes/twitterClient");
const passportStrategy = require("./config/passport");
const app = express();
const socialRouter = require("./src/routes/socialmedia");
const PORT = process.env.PORT;
const CHAT_GPT_KEY = process.env.CHATGPT_KEY;
// const passport = console.log(CHAT_GPT_KEY);
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const twitterRouter = require("./src/routes/twitterLogin");
connect();
// Enable CORS for all requests
app.use(cors({
  origin: ['http://localhost:3001',"http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const router = require('./src/routes')

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["alfjal ;dsfjo; gjoerjf;jfmsaldf "],
//   })
// );
// const answer = async () => {
//   const userComment =
//     "This video is incredibly informative! I love how well-explained the content is, and the visuals are top-notch. Keep up the great work! 👍";
//   const response1 = await assistantResponse(userComment);
//   const response2 = await getChatGPTResponse(userComment);
//   const response3 = await sentimentAnalysis(userComment);
//   console.log(`assistant response: ${response1}`);
//   console.log(`chatgpt response: ${response2}`);
//   console.log(`Sentiment Analysis: ${response3}`);
// };
// answer();
// console.log(__dirname);

// console.log("youtube.js path " + path);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", socialRouter);
app.use("/auth/twitter", twitterRouter);
// Admin routes
app.use("/ai", router.adminAuthentication);
app.use("/ai", router.customer);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/success", (req, res) => {
  res.send("success");
});

app.get("/healthcheck", (req, res) => {
  res.send("server is working fine");
});
