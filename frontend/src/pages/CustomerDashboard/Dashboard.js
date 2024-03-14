import React, { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import youtube from "../../images/avatar.png";
import "./CustomerDashboardStyles/Dashboardyoutube.css";
import axios from "axios";

export const Dashboard = ({ youtubeData }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [numComments, setNumComments] = useState({});

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
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/video/get-comments/${videoId}`,
      {
        headers: { authorization: token },
        channelId: youtubeData?.fetchYouTubeComment?.channels?.items[0]?.id,
        userId: userId,
        numOfComments: numComments[videoId] || 0,
      }
    );
    console.log(response.data);
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
            <div className="col-lg-6 main-cont-dashboard">
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
                    <div key={index} className="card dashboard-youtube-card">
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
                              {/* <span> */}
                              {/* {selectedChannel?.title || "selectedVideo"}
                              {selectedChannel?.id} */}
                              {/* </span> */}
                            </p>
                            <small>
                              <span>{video.snippet.title}</span>
                            </small>

                            <button
                              type="button"
                              className="btn btn-primary post"
                              onClick={() => handleSubmit(video.id.videoId)}>
                              {/* ,youtubeData?.fetchYouTubeComment?.channels?.title */}
                              Post
                            </button>
                            {/* <button
                            type="button"
                            className="btn btn-primary post"
                            onClick={() => handleSubmit(video.id.videoId)}>
                            analysis
                          </button> */}

                            <div className="input-group">
                              {/* <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                updateNumComments(
                                  video.id.videoId,
                                  (numComments[video.id.videoId] || 0) - 1
                                )
                              }>
                              -
                            </button> */}
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
                              {/* <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                updateNumComments(
                                  video.id.videoId,
                                  (numComments[video.id.videoId] || 0) + 1
                                )
                              }>
                              +
                            </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
