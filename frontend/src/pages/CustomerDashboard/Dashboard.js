import React, { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import youtube from "../../images/avatar.png";
import "./CustomerDashboardStyles/Dashboardyoutube.css";
import axios from "axios";

export const Dashboard = ({ youtubeData }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [numComments, setNumComments] = useState({});
  const [comments,setComments]=useState([])
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setNumComments({});
  };

  const updateNumComments = (videoId, value) => {
    setNumComments((prevState) => ({
      ...prevState,
      [videoId]: value,
    }));
  };

  const handleSubmit = async (videoId) => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenData.userId;
    console.log("no of comments in handle submit", numComments);
    const channelId=youtubeData?.fetchYouTubeComment?.channels?.items[0]?.id;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/video/get-comments/${videoId}`,
      {
        headers: { authorization: token },
        channelId: youtubeData?.fetchYouTubeComment?.channels?.items[0]?.id,
        userId: userId,
        numOfComments: numComments[videoId] || 0,
      }
    );
    const data=response.data;
    console.log("Data:",data);
    const videos = data.channels.find(channel => channel.channelId === channelId)?.videos.find(video => video.videoId === videoId);
    console.log("56252", videos);
    setComments(videos.comments);

 
  };
  const handleAnalysis = async (videoId) => {};

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
                      onClick={() => handleChannelSelect(channel)}
                    >
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
                          <p className="channel-post">
                         
                          </p>
                          <small>
                            <span>{video.snippet.title}</span>
                          </small>
                          <div className="d-flex w-100 justify-content-end" >
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
                            onClick={() => handleSubmit(video.id.videoId)}
                          >
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
                {/* <div className="comment-section">
                  <h6>Comments</h6>
                  <div className="comment-section__list">
                    <p className="comment-section__youtubecomment">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eos quas quis eveniet nobis cum error.
                    </p>
                    <textarea className="comment-section__Reply w-100 p-3" cols="30" rows="10"></textarea>
                    <div className="comment-section__commentbutton text-end">
                      <button className="comment-section__commentbutton-accept btn btn-dark">
                        Accept
                      </button>
                      <button className="comment-section__commentbutton-reject btn btn-secondary">
                        Reject
                      </button>
                    </div>
                  </div>
                </div> */}
                  <div className="comment-section">
      <h6>Comments</h6>
      <div className="comment-section__list">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment?.commentId}>
              <p className="comment-section__youtubecomment">{comment.usercomments}</p>
              {!comment.chatGptReplied && (
                <div>
                  <textarea
                    className="comment-section__Reply w-100 p-3"
                    cols="30"
                    rows="10"
                    value={comment.chatGpt}
                   
                  ></textarea>
                  <div className="comment-section__commentbutton text-end">
                    <button
                      className="comment-section__commentbutton-accept btn btn-dark"
                      
                    >
                      Accept
                    </button>
                    <button
                      className="comment-section__commentbutton-reject btn btn-secondary"
                      
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
          <hr />
            </div>
          ))
          )}
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
