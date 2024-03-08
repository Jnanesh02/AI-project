// Function to handle YouTube interactions with constraints
const { assistantResponse } = require("../helper/chatgpt");
const fs = require("fs-extra");
const { google } = require("googleapis");
async function handleYoutubeInteractions(accessToken, channelId) {
  try {
    // const credentials = await fs.readJson(
    //   process.env.CREDENTIALS_PATH + "/config/credentials.json"
    // );

    // const accessToken = credentials.accessToken;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth });

    const channels = await youtube.channels.list({
      part: "snippet,contentDetails,statistics",
      id: channelId,
    });
    // console.log("inside the youtube.js file", channels.data);
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
      order: "date",
    });
    // console.log(channels.data.items[0].snippet);
    // console.log("3", videos.data.items);

    const videoComments = [];

    // for (const video of videos.data.items) {
    //   const videoId = video.id.videoId; // Extract video ID

    //   // Fetch comments for this video, filtering for top-level comments

    //   const videoDetails = youtube.videos.list({
    //     part: "snippet,statistics",
    //     id: videoId,
    //   });

    //   // console.log("5", videoDetails);

    //   const videoStats = await videoDetails
    //     .then((details) => {
    //       // console.log("5", details.data.items[0].statistics);
    //       return { data: details.data.items[0] };
    //     })
    //     .catch((err) => console.log(err.message));

    //   console.log("6", videoStats.data);

    //   const comments = await youtube.commentThreads.list({
    //     part: "snippet",
    //     videoId: videoId,
    //     // Ensure chronological order
    //     textDisplay: "original", // Include original comment text
    //     // searchRank: "topLevel", // Filter for top-level comments
    //   });

    //   // Only add top-level comments to the array
    //   videoComments.push({
    //     videoId: videoId,
    //     comments: comments.data.items.map((comment) => {
    //       comment.snippet.topLevelComment.snippet.textDisplay;
    //     }),
    //   });
    // }
    for (const video of videos.data.items) {
      const videoId = video.id.videoId;

      // Check comment status before fetching comments
      try {
        const videoDetails = await youtube.videos.list({
          part: "snippet,statistics",
          id: videoId,
        });
        // console.log("-------------------------------------------------");
        // console.log(videoDetails.data.items[0].statistics);

        if (videoDetails.data.items[0].statistics.commentCount > 0) {
          // Fetch comments if comments are enabled
          const comments = await youtube.commentThreads.list({
            part: "snippet",
            videoId: videoId,
            textDisplay: "original", // Include original comment text
            maxResults: 50,
            // Comment filtering/sorting as needed
          });
          // console.log("comments", comments.data);

          // Store comments in videoComments array
          videoComments.push({
            videoId: videoId,
            comments: comments.data.items.map(
              (comment) => comment.snippet.topLevelComment.snippet.textDisplay
            ),
          });
        } else {
          // Handle videos with disabled comments
          console.log(`Comments disabled for video: ${videoId}`);
          videoComments.push({
            videoId: videoId,
            comments: ["No comments or disabled comments"],
          });
          // You can also store this information somewhere
        }
      } catch (error) {
        console.error(`Error fetching comments for video ${videoId}:`, error);
        // Handle other errors as needed
      }
    }

    // console.log("4", videoComments);
    // videoComments.map((v) => console.log(v.comments.length));

    return {
      // channels: channels.data.items[0].snippet,
      channels: channels.data,
      videos: videos.data.items,
      videoComments: videoComments,
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
