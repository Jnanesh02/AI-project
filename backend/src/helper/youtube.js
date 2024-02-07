// Function to handle YouTube interactions with constraints
const { assistantResponse } = require("../helper/chatgpt");
const fs = require("fs-extra");
const { google } = require("googleapis");
async function handleYoutubeInteractions(channelId) {
  try {
    const credentials = await fs.readJson(
      process.env.CREDENTIALS_PATH + "/config/credentials.json"
    );

    const accessToken = credentials.accessToken;
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth });

    const channels = youtube.channels.list(
      {
        part: "snippet,contentDetails,statistics",
        id: channelId,
      },
      (err, channelResponse) => {
        if (err) {
          console.log("1", err);
        } else {
          console.log("2", channelResponse.data.items[0].snippet);
        }
      }
    );

    // const videos = youtube.videos.list(
    //   {
    //     part: "snippet",
    //     channelId: channelId,
    //     id: channelId,
    //   },
    //   (err, videoResponse) => {
    //     if (err) {
    //       console.log("3", err);
    //     } else {
    //       console.log("4", videoResponse.data.items);
    //     }
    //   }
    // );

    const videos = await youtube.search.list({
      part: "snippet",
      channelId: channelId,
      type: "video",
    });
    console.log("3", videos.data.items);

    // console.log("3", channels);
    // console.log(channels.data.items[0]);

    // Iterate through comments, replying to existing ones
    // comments.forEach(async (comment) => {
    //   if (comments.length >= minCount) {
    //     // Ensure minimum count is met
    //     const topLevelComment =
    //       comment.snippet.topLevelComment.snippet.textDisplay;
    //     const chatGPTResponse = await assistantResponse(topLevelComment);

    //     if (chatGPTResponse.trim() !== "") {
    //       const replyResponse = await youtube.commentThreads.insert({
    //         auth: auth,
    //         part: "snippet",
    //         resource: {
    //           snippet: {
    //             channelId:
    //               comment.snippet.topLevelComment.snippet.authorChannelId.value,
    //             videoId: comment.snippet.videoId,
    //             topLevelComment: {
    //               snippet: {
    //                 textOriginal: chatGPTResponse,
    //               },
    //             },
    //           },
    //         },
    //       });
    //     }
    //   }
    // });
  } catch (error) {
    console.error("Error handling YouTube interactions:", error.message);
  }
}

module.exports = handleYoutubeInteractions;
