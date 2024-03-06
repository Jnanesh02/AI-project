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
const router = require("./src/routes");
const jwt = require("jsonwebtoken");
// const { requireAuth } = require("./middleware/auth");
const emojiSchema = require("./src/model/testModel");

connect();
// Enable CORS for all requests
// app.use(
//   cors({
//     origin: ["http://localhost:3001", "http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(cors());
// app.use(requireAuth);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
// console.log(__dirname);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["alfjal ;dsfjo; gjoerjf;jfmsaldf "],
//   })
// );
const answer = async () => {
  const userComment =
    "This video is incredibly informative! I love how well-explained the content is, and the visuals are top-notch. Keep up the great work! 👍";
  // const response1 = await assistantResponse(userComment);
  const response2 = await getChatGPTResponse(userComment);
  const response3 = await sentimentAnalysis(userComment);
  // console.log(`assistant response: ${response1}`);
  console.log(`chatgpt response: ${response2}`);
  console.log(`Sentiment Analysis: ${response3}`);
};
// answer();

// createAssistant();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", socialRouter);
app.use("/auth/twitter", twitterRouter);
// Admin routes

app.use("/ai", router.adminAuthentication);
app.use("/ai", router.customer);
app.use("/ai", router.plan);
app.use("/ai", router.youtube);
// app.use("/ai", router.assistant);
app.use("/ai", router.assistant2);
app.use("/ai", router.form);



app.get("/success", (req, res) => {
  res.send("success");
});

const assistantInstructions = require("./src/model/assistantModel");

app.get("/update-assistant-instructions", async (req, res) => {
  console.log("update assistant instruction", req.body);
  try {
    const { data } = req.body;
  } catch (err) {}
});

app.get("/healthcheck", (req, res) => {
  res.send("server is working fine");
});

// testing to get emoji in the backend
// app.post("/getemoji", async (req, res) => {
//   try {
//     const emoji = req.body.emoji;
//     console.log("emoji", emoji);
//     const Emoji = await emojiSchema.create({
//       data: {
//         Emoji: emoji,
//       },
//     });
//     await Emoji.save();
//     return res.status(200).json("ppp");
//   } catch (err) {
//     return res.status(500).json({ err: err.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
