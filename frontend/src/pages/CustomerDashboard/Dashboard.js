import React, { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import youtube from "../../images/avatar.png";
import "./CustomerDashboardStyles/Dashboardyoutube.css";
import axios from "axios";

export const Dashboard = ({ youtubeData }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [numComments, setNumComments] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyTexts, setReplyTexts] = useState(Array(comments.length).fill("")); // Object to store commentId:reply pairs
  const [loading, setLoading] = useState(false);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setNumComments({});
  };
  let apiKey = process.env.GOOGLE_API_KEY;

  const updateNumComments = (videoId, value) => {
    setNumComments((prevState) => ({
      ...prevState,
      [videoId]: value,
    }));
  };
  const handleReplyTextChange = (index, value, commentId) => {
    const updatedReplyTexts = [...replyTexts];
    updatedReplyTexts[index] = value;
    setReplyTexts(updatedReplyTexts);

    const updateComment = [...comments];

    updateComment[index].chatGpt = value;

    setComments(updateComment);
  };

  const handleAccept = async (comment, videoId, replyText) => {
    // const response = await axios.post(
    console.log("hellodata:", comment, videoId, replyText);
    alert(`Comment accepted!`);
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenData.userId;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/video/post-comment-replies`,
      {
        videoId: videoId,
        commentId: comment.commentId,
        replyText: replyText,
        userId: userId,
      }
    );
    setComments(
      comments.map((existingComment) =>
        existingComment.commentId === comment.commentId
          ? { ...existingComment, chatGptReplied: true } // Mark comment as accepted
          : existingComment
      )
    );
    console.log(response);
  };
  const handleAcceptAll = async () => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenData.userId;
    console.log("commentsbefore", comments);
    for (let i = 0; i < comments.length; i++) {
      // console.log("122", comments[i]);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/video/post-comment-replies`,
          {
            videoId: selectedVideo,
            commentId: comments[i].commentId,
            replyText: comments[i].chatGpt,
            userId: userId,
          },
          {
            headers: { authorization: token },
          }
        );
        comments[i].chatGptReplied = true;
        setComments(comments);
        console.log(
          "response inside handle accept all function",
          response.data
        );

        // if (response.status === 200) {
        //   setLoading(false);
        // }
      } catch (err) {
        setLoading(false);
        console.error(err.message);
      }

    

      // setComments(
      //   comments.map((existingComment) =>
      //     existingComment.commentId === comments[i].commentId
      //       ? {
      //           ...existingComment,
      //           chatGptReplied: true,
      //         } // Mark comment as accepted
      //       : existingComment
      //   )
      // );
      // setComments(comments);
    }
  };
 

  // const [acceptAllData, setAcceptAllData] = useState([
  //   {
  //     commentid: "",
  //     replycomment: "",
  //   },
  // ]);

  const handleSubmit = async (videoId) => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenData.userId;
    console.log("no of comments in handle submit", numComments);
    setSelectedVideo(videoId);
    const channelId = youtubeData?.fetchYouTubeComment?.channels?.items[0]?.id;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/video/get-comments/${videoId}`,
      {
        headers: { authorization: token },
        channelId: channelId,
        userId: userId,
        numOfComments: numComments[videoId] || 0,
      }
    );
    const data = response.data;
    // console.log("Data:", data);
    const videos = data.channels
      .find((channel) => channel.channelId === channelId)
      ?.videos.find((video) => video.videoId === videoId);
    // console.log("56252", videos);
    setComments(videos.comments.filter((comment) => !comment.chatGptReplied));
  };

  useEffect(() => {
    setSelectedChannel(null);
    setNumComments({});
  }, [youtubeData]);

  return (
    <>
      <section className="dashboard-youtube">
        <div className="container-fluid">
          <div className="row main-row-dashboard">
            <div className="col-lg-3 main-cont-dashboard">
              <h5 className="channel-headings">
                <img class="youtube-icons-dashboard" src={youtube} alt="/" />
                Youtube Channel{" "}
              </h5>
              {youtubeData?.fetchYouTubeComment?.channels &&
              typeof youtubeData.fetchYouTubeComment.channels === "object" ? (
                <div className="card dashboard-youtube-card">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            youtubeData.fetchYouTubeComment.channels.items[0]
                              .snippet.thumbnails.default.url
                          }
                          alt="/"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="active">
                          <span>
                            {
                              youtubeData.fetchYouTubeComment.channels.items[0]
                                .snippet.title
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                youtubeData?.fetchYouTubeComment?.channels?.map(
                  (channel, index) => (
                    <div
                      key={index}
                      className={`card dashboard-youtube-card ${
                        selectedChannel === channel ? "active" : ""
                      }`}
                      onClick={() => handleChannelSelect(channel)}>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img src={avatar} alt="/" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p className="active">
                              <span>{channel.title}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
            <div className="col-lg-5 main-cont-dashboard">
              <h5 className="channel-headings">
                <form></form>
                <img
                  className="youtube-icons-dashboard"
                  src={youtube}
                  alt="/"
                />{" "}
                Youtube Channel Post
              </h5>
              <div className="youtube-channel-posts">
                {youtubeData?.fetchYouTubeComment?.videos &&
                  youtubeData.fetchYouTubeComment.videos.map((video, index) => (
                    <div key={index} className="card  dashboard-youtube-card ">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src={video.snippet.thumbnails.default.url}
                              alt="--"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p className="channel-post"></p>
                            <small>
                              <span>{video.snippet.title}</span>
                            </small>
                            <div className="d-flex w-100 justify-content-end">
                              <div className="input-group w-25 mt-3 ">
                                <input
                                  type="number"
                                  min={0}
                                  className="form-control"
                                  onChange={(e) =>
                                    updateNumComments(
                                      video.id.videoId,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  value={numComments[video.id.videoId] || 0}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-primary post"
                                onClick={() => handleSubmit(video.id.videoId)}>
                                Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-lg-4 main-cont-dashboard">
              <h5 className="channel-headings">
                <form></form>
                <img
                  className="youtube-icons-dashboard"
                  src={youtube}
                  alt="/"
                />{" "}
                Comment Reply
              </h5>
              <div className="card  text-start py-4 px-3 comment-section-scroll">
                <div className="comment-section">
                  <h6>Comments</h6>
                  <div className="comment-section__list">
                    {comments.length === 0 ? (
                      <p>No comments yet.</p>
                    ) : (
                      comments.map((comment, index) => (
                        <div key={comment?.commentId}>
                          <p className="comment-section__youtubecomment">
                            {!comment.chatGptReplied && comment.usercomments}
                          </p>
                          {!comment.chatGptReplied && (
                            <div>
                              <textarea
                                className="comment-section__Reply w-100 p-3"
                                cols="30"
                                rows="10"
                                value={
                                  replyTexts[index] !== undefined
                                    ? replyTexts[index]
                                    : comment.chatGpt
                                }
                                onChange={(e) =>
                                  handleReplyTextChange(
                                    index,
                                    e.target.value,
                                    comment.commentId
                                  )
                                } // Update replyTexts state for this index
                              ></textarea>
                              <div className="comment-section__commentbutton text-end">
                                <button
                                  className="comment-section__commentbutton-accept btn btn-dark"
                                  onClick={() =>
                                    handleAccept(
                                      comment,
                                      selectedVideo,
                                      replyTexts[index]
                                    )
                                  } // Pass replyTexts[index] to handleAccept
                                >
                                  Accept
                                </button>
                                <button className="comment-section__commentbutton-reject btn btn-secondary">
                                  Reject
                                </button>
                              </div>
                            </div>
                          )}
                          <hr />
                        </div>
                      ))
                    )}
                    <button onClick={handleAcceptAll} loading={true}>
                      Accept all
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
