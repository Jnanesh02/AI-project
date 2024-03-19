// Function to handle YouTube interactions with constraints
const { assistantResponse } = require("../helper/chatgpt");
const fs = require("fs-extra");
const { google } = require("googleapis");
async function handleYoutubeInteractions(accessToken, channelId) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth });

    const channels = await youtube.channels.list({
      part: "snippet,contentDetails,statistics",
      id: channelId,
    });

    const videos = await youtube.search.list({
      part: "snippet",
      channelId: channelId,
      type: "video",
      order: "date",
    });
    // console.log(channels.data.items[0].snippet);
    // console.log("3", videos.data.items);

    // const videoComments = [];

    // for (const video of videos.data.items) {
    //   const videoId = video.id.videoId;

    //   // Check comment status before fetching comments
    //   try {
    //     const videoDetails = await youtube.videos.list({
    //       part: "snippet,statistics",
    //       id: videoId,
    //     });
    //     // console.log("-------------------------------------------------");
    //     // console.log(videoDetails.data.items[0].statistics);

    //     if (videoDetails.data.items[0].statistics.commentCount > 0) {
    //       // Fetch comments if comments are enabled
    //       const comments = await youtube.commentThreads.list({
    //         part: "snippet",
    //         videoId: videoId,
    //         textDisplay: "original", // Include original comment text
    //         maxResults: 50,
    //         // Comment filtering/sorting as needed
    //       });
    //       // console.log("comments", comments.data);

    //       // Store comments in videoComments array
    //       videoComments.push({
    //         videoId: videoId,
    //         comments: comments.data.items.map(
    //           (comment) => comment.snippet.topLevelComment.snippet.textDisplay
    //         ),
    //       });
    //     } else {
    //       // Handle videos with disabled comments
    //       console.log(`Comments disabled for video: ${videoId}`);
    //       videoComments.push({
    //         videoId: videoId,
    //         comments: ["No comments or disabled comments"],
    //       });
    //       // You can also store this information somewhere
    //     }
    //   } catch (error) {
    //     console.error(`Error fetching comments for video ${videoId}:`, error);
    //     // Handle other errors as needed
    //   }
    // }

    // console.log("4", videoComments);
    // videoComments.map((v) => console.log(v.comments.length));

    return {
      // channels: channels.data.items[0].snippet,
      channels: channels.data,
      videos: videos.data.items,
      // videoComments: videoComments,
    };
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
