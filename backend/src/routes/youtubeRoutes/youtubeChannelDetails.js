const express = require("express");
const commentsSchema = require("../../model/commentsmodel");
const mongoose = require("mongoose");
const { assistantResponse, openai } = require("../../helper/chatgpt");
const {
  getChanneldetails,
  getVideosList,
  getCommentsForVideos,
  replyToComments,
} = require("../../helper/youtubeFunctions");
const {
  verifyAccessToken,
  generateNewAccessToken,
} = require("../../helper/tokens");
const Customer = require("../../model/customermodel");

const { createAssistant, updateInstructions } = require("../../helper/chatgpt");

const router = express.Router();

router.get("/channel/:channelId", async (req, res) => {
  try {
    const channel = await getChanneldetails(req.params.channelId);
    res.json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/channel/videos/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const videos = await getVideosList(channelId);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router to fetch the youtube comments for a specific video with the num of comments specified
router.post("/video/get-comments/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;

    const { numOfComments, channelId, userId } = req.body;
    // console.log("inside api ", req.body);
    const customer = await Customer.findById(userId);


    // console.log("inside api", customer);
    const accessToken = customer.accessToken;
    const refreshToken = customer.refreshToken;
    let validAccessToken = null;
    try {
      let isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        validAccessToken = accessToken;
      } else {
        validAccessToken = await generateNewAccessToken(refreshToken);
        customer.accessToken = validAccessToken;
        await customer.save();

        console.log("new Token generated:", validAccessToken);
      }
    } catch (err) {
      console.error(err.message);
    }
    const videos = await getCommentsForVideos(
      validAccessToken,
      videoId,
      numOfComments
    );
    // console.log("videos inside api", videos[0].comments);
    const assistantId = customer.assistantId;
    // const assistantId = "asst_6YBo6GvvYLVEmzumZ6XqpCbU";
    
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    const commentsPromises = videos[0].comments.map(async (comment) => ({
      commentId: comment.id,
      usercomments: comment.data,
      chatGpt: await assistantResponse(assistantId, comment.data),
    }));


    const comments = await Promise.all(commentsPromises);
    const existingCustomer = await commentsSchema.findOne({
      customerId: userIdObjectId,
    });
    if (!existingCustomer) {
      const createNewCommentSection = new commentsSchema({
        customerId: userId,
        channels: [
          {
            channelId: channelId,
            videos: [
              {
                videoId: videos[0].videoId,
                comments,
              },
            ],
          },
          ,
        ],
      });
      await createNewCommentSection.save();
      console.log("if data is not there in db :::: 1");
      return res.status(200).json(createNewCommentSection);
    } else {
      let existingChannel = existingCustomer.channels.find(
        (channel) => channel.channelId === channelId
      );
      if (!existingChannel) {
        existingChannel = {
          channelId: channelId,
          videos: [
            {
              videoId,
              comments,
            },
          ],
        };
        existingCustomer.channels.push(existingChannel);
        await existingCustomer.save();
        console.log("2");
        return res.status(200).json(existingCustomer);
      } else {
        let existingVideo = existingChannel.videos.find(
          (video) => video.videoId === videoId
        );
        if (!existingVideo) {
          existingChannel.videos.push({
            videoId,
            comments,
          });
          await existingCustomer.save();
          console.log("new vedio is comments already data is exisit ::: 3");
          return res.status(200).json(existingCustomer);
        } else {
          for (const commentt of comments) {
            
            console.log("commments", commentt);

            const newComment = existingVideo.comments.find(
              (comment) => comment.commentId === commentt.commentId
            );
            console.log("kkkkk", newComment, "hhhhh");
            if (!newComment) {
              existingVideo.comments.push(commentt);
            }
          }
          await existingCustomer.save();
        }
      }
      console.log(
        "if already chatgpt gave comments and for new comments chatgpt giving 4"
      );

      return res.status(200).json(existingCustomer);
    }
    // we need to save the comments here
  } catch (err) {
    console.log("123", err.message);
    return res.status(500).json({ message: err.message });
  }
});

// router to reply to a specific comment with reply text
router.post("/video/post-comment-replies", async (req, res) => {
  try {
    const { videoId, commentId, replyText, userId } = req.body;
    console.log("4654584", req.body);
    const customer = await Customer.findById(userId);
    const comments = await commentsSchema.find({ customerId: userId });
    console.log("comments in the post api", comments);
    let commentToUpdate;
    for (const channel of comments[0].channels) {
      for (const video of channel.videos) {
        for (const comment of video.comments) {
          if (comment.commentId === commentId) {
            commentToUpdate = comment;
            break; // Exit the loops once the comment is found
          }
        }
      }
    }
    console.log("current comment", commentToUpdate);
    const accessToken = customer.accessToken;
    const refreshToken = customer.refreshToken;
    let validAccessToken = null;
    try {
      let isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        validAccessToken = accessToken;
      } else {
        validAccessToken = await generateNewAccessToken(refreshToken);
        customer.accessToken = validAccessToken;
        await customer.save();

        console.log("new Token generated:", validAccessToken);
      }
    } catch (err) {
      console.error(err.message);
    }

    const response = await replyToComments(
      validAccessToken,
      videoId,
      commentId,
      replyText
    );
    console.log(response);
    commentToUpdate.chatGptReplied = true;
    comments[0]
      .save() // Assuming comments is an array containing a single document
      .then(() => console.log("Comment updated and reply sent!"))
      .catch((error) => console.error("Error saving comment:", error));
    return res.status(200).json({ message: "comment replied successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});

// router.post("/video/post-all-comment-replies",async(req,res)=>{

// })

// to create a seperate assistant for the user
const assistantConfig = {
  name: "test",
  instructions: "Objective: Engage effectively with YouTube comments. Analyze sentiments, responding positively to supportive and neutral feedback, and flag negative comments with '1'. Tailor responses to match the user's desired tone, style, and emojis, ensuring brevity (no more than 25 words). Personalize replies when possible and maintain authenticity. Update your engagement strategy based on new instructions and feedback.",
  // tools: [{ type: "code_interpreter" }],
  model: "gpt-4-turbo-preview",
};

router.post("/createassistant", async (req, res) => {
  try {
    const instructions = JSON.stringify(req.body.data);
    const userId = req.body.id;
    console.log(req.body);
    let customer = await Customer.findById({ _id: userId });
    console.log("customer object", customer);
    if (customer.assistantId) {
      // 3. Assistant already exists, return assistantId

      const updatedAssistant = await updateInstructions(
        customer.assistantId,
        instructions
      );

      return res.json({
        assistantId: customer.assistantId,
        message: "assistant instructions updated",
      });
    } else {
      assistantConfig.name = "testing assistant";
      assistantConfig.instructions +="\n" + instructions;
      const assistant = await createAssistant(assistantConfig);
      console.log(assistant);
      customer.assistantId = assistant.id;
      await customer.save();
      return res.json(assistant.id);
    }
    // return res.json(instructions);
  } catch (err) {
    console.log(err.message);
    return res.json(err.message);
  }
});

module.exports = router;
