const express = require("express");
const commentsSchema = require("../../model/commentsmodel");
const mongoose = require("mongoose");
const { assistantResponse, openai } = require("../../helper/chatgpt");
const {
  getChanneldetails,
  getVideosList,
  getCommentsForVideos,
} = require("../../helper/youtubeFunctions");
const {verifyAccessToken,generateNewAccessToken}=require("../../helper/tokens");
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

router.post("/video/get-comments/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;

    const { numOfComments, channelId, userId } = req.body;
    // console.log("inside api ", req.body);
    const customer = await Customer.findById(userId);

    // console.log("inside api", customer);
    const accessToken = customer.accessToken;
    const refreshToken=customer.refreshToken;
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
    // const assistantId = customer.assistantId;
    const assistantId = "asst_6YBo6GvvYLVEmzumZ6XqpCbU";
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
      const existingChannel = existingCustomer.channels.find(
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
        const existingVideo = existingChannel.videos.find(
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
          // const existingCommentId = existingVideo.comments.map(
          //   (comment) => comment.commentId
          // );
          // console.log("existingCommentId", existingCommentId);
          // const newComment = comments.filter((comment) => {
          //   return !existingCommentId.includes(comment.commentId);
          // });
          // console.log("newComment", newComment);
          // existingVideo.comments.push(...newComment);
          for (const comment of comments) {
            const newComment = existingVideo.comments.find(
              (comment) => comment.commentId === comment.commentId
            );
            if (!newComment) {
              existingVideo.comments.push(comment);
            }
          }
          await existingCustomer.save();
        }
      }
      console.log("if already chatgpt gave comments and for new comments chatgpt giving 4");

      return res.status(200).json(existingCustomer);
    }
    // we need to save the comments here
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});



router.get("/video/get-comment-replies", async (req, res) => {
  try {
  } catch (err) {}
});

// to create a seperate assistant for the user
const assistantConfig = {
  name: "test",
  instructions: "",
  // tools: [{ type: "code_interpreter" }],
  model: "gpt-4-turbo-preview",
};

// console.log(assistantConfig);

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
    }
    // console.log("body", req.body);
    // console.log(instructions);
    else {
      assistantConfig.name = "testing assistant";
      assistantConfig.instructions = instructions;
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
