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

    const channels = await youtube.channels.list({
      part: "snippet,contentDetails,statistics",
      id: channelId,
    });
    // (err, channelResponse) => {
    //   if (err) {
    //     console.log("1", err);
    //   } else {
    //     return  (channelResponse.data.items[0].snippet);
    //   }
    // }
    // );
    // console.log("2", channels.data.items[0].snippet);
    // console.log("channel response:", channels.data.items[0].snippet);

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
    // console.log("3", videos.data.items);
    return {
      channels: channels.data.items[0].snippet,
      videos: videos.data.items,
    };

    const videoComments = [];

    for (const video of videos.data.items) {
      const videoId = video.id.videoId; // Extract video ID

      // Fetch comments for this video, filtering for top-level comments
      if (!video) {
        console.error("Skipping video: Missing video object.");
        continue;
      }

      // Check if privacy property is available
      if (!video.contentDetails || !video.contentDetails.privacy) {
        console.warn(
          `Skipping video ${video.id.videoId}: Missing privacy property.`
        );
        continue;
      }

      // Now check the privacy status safely
      if (video.contentDetails.privacy.status === "private") {
        console.log(
          `Skipping video ${video.id.videoId}: Comments disabled (private).`
        );
        continue;
      }
      const comments = await youtube.commentThreads.list({
        part: "snippet",
        videoId: videoId,
        // Ensure chronological order
        textDisplay: "original", // Include original comment text
        // searchRank: "topLevel", // Filter for top-level comments
      });

      // Only add top-level comments to the array
      videoComments.push({
        videoId: videoId,
        comments: comments.data.items.map(
          (comment) => comment.snippet.topLevelComment.snippet.textDisplay
        ),
      });
    }

    console.log("4", videoComments);
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
