// Function to handle YouTube interactions with constraints
const { assistantResponse } = require("../helper/chatgpt");
async function handleYoutubeInteractions(
  channelId,
  videoId,
  minCount,
  maxCount,
  accessToken
) {
  try {
    // Create a youtube object using OAuth2 tokens (assuming you have them)
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken }); // Replace with actual access token
    const youtube = google.youtube({ version: "v3", auth });

    // Fetch user's video comments with specified count
    const commentsResponse = await youtube.commentThreads.list({
      part: "snippet",
      allThreadsRelatedToChannelId: channelId,
      videoId: videoId,
      maxResults: maxCount, // Limit to maxCount comments
    });

    const comments = commentsResponse.data.items;

    // Iterate through comments, replying to existing ones
    comments.forEach(async (comment) => {
      if (comments.length >= minCount) {
        // Ensure minimum count is met
        const topLevelComment =
          comment.snippet.topLevelComment.snippet.textDisplay;
        const chatGPTResponse = await assistantResponse(topLevelComment);

        if (chatGPTResponse.trim() !== "") {
          const replyResponse = await youtube.commentThreads.insert({
            auth: auth,
            part: "snippet",
            resource: {
              snippet: {
                channelId:
                  comment.snippet.topLevelComment.snippet.authorChannelId.value,
                videoId: comment.snippet.videoId,
                topLevelComment: {
                  snippet: {
                    textOriginal: chatGPTResponse,
                  },
                },
              },
            },
          });
        }
      }
    });
  } catch (error) {
    console.error("Error handling YouTube interactions:", error.message);
  }
}


module.export = { handleYoutubeInteractions };
