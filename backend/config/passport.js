const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const { google } = require("googleapis");
const passport = require("passport");
// const { OpenAI } = require("openai");
const { assistantResponse } = require("../src/helper/chatgpt");

passport.serializeUser((user, done) => {
  console.log("------------------------");
  console.log(user);

  done(null, user.toString());
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
      enableProof: true,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    // Process Google authentication, create or update user in the database4
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database based on their Google ID
        return done(profile, null);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

//youtube comments
// passport.use(
//   new YoutubeV3Strategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/youtube/callback",
//       scope: [
//         "https://www.googleapis.com/auth/youtube.readonly",
//         "https://www.googleapis.com/auth/youtube.force-ssl",
//       ],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // Access user's channel details
//       const channelId = profile.id;

//       // Create a youtube object using OAuth2 tokens
//       const auth = new google.auth.OAuth2();
//       auth.setCredentials({ access_token: accessToken });
//       const youtube = google.youtube({ version: "v3", auth });

//       // req.session.accessToken=accessToken
//       profile.accessToken = accessToken;

//       // Make requests to get user's activities

//       // Fetch user's channel details
//       youtube.channels.list(
//         {
//           part: "snippet,contentDetails,statistics",
//           id: channelId,
//         },
//         (err, channelResponse) => {
//           if (err) {
//             return done(err);
//           }

//           // console.log("User Channel Details:", channelResponse.data);

//           // Fetch user's video comments
//           youtube.commentThreads.list(
//             {
//               part: "snippet",
//               allThreadsRelatedToChannelId: channelId,
//             },
//             (err, commentsResponse) => {
//               if (err) {
//                 return done(err);
//               }

//               const comments = commentsResponse.data.items;

//               // Iterate through each comment thread
//               comments.forEach(async (comment) => {
//                 try {
//                   // Extract topLevelComment from the snippet
//                   const topLevelComment =
//                     comment.snippet.topLevelComment.snippet.textOriginal;

//                   // Log or process the topLevelComment as needed
//                   // Pass the comment to ChatGPT for a short response
//                   const chatGPTResponse = await assistantResponse(
//                     topLevelComment
//                   );
//                   // console.log(chatGPTResponse);

//                   // Check if the ChatGPT response is not empty
//                   if (chatGPTResponse.trim() !== "") {
//                     try {
//                       const replyResponse = await youtube.comments.insert({
//                         auth: auth,
//                         part: "snippet",
//                         resource: {
//                           snippet: {
//                             channelId:
//                               comment.snippet.topLevelComment.snippet
//                                 .authorChannelId.value,
//                             videoId: comment.snippet.videoId,
//                             parentId: comment.id,
//                             textOriginal: chatGPTResponse,
//                           },
//                         },
//                       });
//                       // console.log(
//                       //   "Comment reply inserted successfully:",
//                       //   replyResponse
//                       // );
//                     } catch (error) {
//                       console.error(
//                         "Error replying to YouTube comment:",
//                         error.message
//                       );
//                       // console.error("Comment details:", comment.snippet);
//                     }
//                   } else {
//                     console.log("chatgpt provided empty response");
//                   }
//                 } catch (error) {
//                   console.error(
//                     "Error replying to YouTube comment:",
//                     error.message
//                   );
//                 }
//               });
//               // Fetch user's liked videos
//               youtube.videos.list(
//                 {
//                   part: "snippet",
//                   myRating: "like",
//                 },
//                 (err, likedVideosResponse) => {
//                   if (err) {
//                     return done(err);
//                   }

//                   // console.log("User Liked Videos:", likedVideosResponse.data);

//                   // You can add more API requests based on your requirements

//                   // Call done() to finish the authentication process
//                   done(null, profile);
//                 }
//               );
//             }
//           );
//         }
//       );
//     }
//   )
// );
module.exports = {
  login: function (app) {
    passport.use(
      new YoutubeV3Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/auth/youtube/callback",
          scope: [
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/youtube.force-ssl",
          ],
        },
        async function (accessToken, refreshToken, profile, done) {
          app.use(passport.initialize());
          app.use(passport.session());
          const user = {
            profile: profile,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          return done(null, user);
        }
      )
    );
  },
};
