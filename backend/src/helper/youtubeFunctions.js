const fs = require("fs-extra");
const { google } = require("googleapis");

async function youtubeAuth() {
  try {
    const credentials = await fs.readJson(
      process.env.CREDENTIALS_PATH + "/config/credentials.json"
    );

    const accessToken = credentials.accessToken;
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth });
    return youtube;
  } catch (err) {
    console.log(err.message);
  }
}

async function getChanneldetails(channelId) {
  try {
    console.log(channelId, "channelId");
    let youtube = await youtubeAuth();
    const channels = await youtube.channels.list({
      part: "snippet,contentDetails,statistics",
      id: channelId,
    });

    // console.log("channels in function:", channels.data);

    return channels.data;
  } catch (err) {
    console.log("error getting channel details", err.message);
  }
}

async function getVideosList(channelId) {
  try {
    let youtube = await youtubeAuth();
    const videos = await youtube.search.list({
      part: "snippet",
      channelId: channelId,
      type: "video",
      order: "date",
    });
    return videos.data.items;
  } catch (err) {
    console.error("Error in getting video list : ", err.message);
  }
}

async function getCommentsForVideos(videoId, noOfComments) {
  try {
    let youtube = await youtubeAuth();
    let videoComments = []; // {videoId:"something", comments:"[] comments of the respective videos"}
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
          maxResults: noOfComments,
          // Comment filtering/sorting as needed
        });

        // Store comments in videoComments array
        videoComments.push({
          videoId: videoId,
          comments: comments.data.items.map(
            (comment) => comment.snippet.topLevelComment.snippet.textDisplay
          ),
        });
        return videoComments;
      } else {
        // Handle videos with disabled comments
        console.log(`Comments disabled for video: ${videoId}`);
        videoComments.push({
          videoId: videoId,
          comments: ["No comments or disabled comments"],
        });
        // You can also store this information somewhere
        return videoComments;
      }
    } catch (error) {
      console.error(`Error fetching comments for video ${videoId}:`, error);
      // Handle other errors as needed
    }
  } catch (err) {
    console.error("error getting comments for video", err.message);
  }
}

async function replyToComments(videoId) {
  try {
    let youtube = await youtubeAuth();
    const comments = youtube.comments.list({
      part: "snippet",
    });
  } catch (err) {
    console.error("error replying to comments", err.message);
  }
}

module.exports = {
  youtubeAuth,
  getChanneldetails,
  getVideosList,
  getCommentsForVideos,
};