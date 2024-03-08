const express = require("express");
const { connect } = require("./config/database");
require("dotenv").config();
const {
  getChatGPTResponse,
  assistantResponse,
  sentimentAnalysis,
  createAssistant,
} = require("./src/helper/chatgpt");
const cors = require("cors");
const passportStrategy = require("./config/passport");
const app = express();
const socialRouter = require("./src/routes/socialmedia");
const PORT = process.env.PORT;

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const router = require("./src/routes");

connect();

app.use(cors());
// app.use(requireAuth);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
// console.log("path name", __dirname);

const sessionSecret = "your-strong-and-random-secret-key";
app.use(cookieParser()); // Parse cookies for session data

app.use(
  session({
    secret: sessionSecret,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create empty sessions
    cookie: {
      // secure: true, // Set to 'true' only in production for HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
      httpOnly: true, // Block client-side JavaScript access
    },
  })
);

// checking chatgpt is working or not?

// const answer = async () => {
//   const userComment =
//     "This video is incredibly informative! I love how well-explained the content is, and the visuals are top-notch. Keep up the great work! 👍";
//   // const response1 = await assistantResponse(userComment);
//   const response2 = await getChatGPTResponse(userComment);
//   const response3 = await sentimentAnalysis(userComment);
//   // console.log(`assistant response: ${response1}`);
//   console.log(`chatgpt response: ${response2}`);
//   console.log(`Sentiment Analysis: ${response3}`);
// };
// answer();

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", socialRouter);

// Admin routes

app.use("/ai", router.adminAuthentication);
app.use("/ai", router.customer);
app.use("/ai", router.plan);
app.use("/ai", router.youtube);
// app.use("/ai", router.assistant);
app.use("/ai", router.assistant2);
app.use("/ai", router.form);

// const assistantInstructions = require("./src/model/assistantModel");

// app.get("/update-assistant-instructions", async (req, res) => {
//   console.log("update assistant instruction", req.body);
//   try {
//     const { data } = req.body;
//   } catch (err) {}
// });

app.get("/healthcheck", (req, res) => {
  res.send("server is working fine");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
