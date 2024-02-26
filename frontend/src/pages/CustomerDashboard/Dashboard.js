import React, { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import youtube from "../../images/avatar.png";
import "./CustomerDashboardStyles/Dashboardyoutube.css";
import axios from "axios";
export const Dashboard = ({ youtubeData }) => {
  // Destructure youtubeData from props
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [numComments, setNumComments] = useState(0);
  //   console.log("updateNumComments", youtubeData);
  //   function isTokenExpired() {
  //     const token = localStorage.getItem('adminToken');
  //     if (!token) {
  //       return true;
  //     }
  //     const tokenData = JSON.parse(atob(token.split('.')[1]));
  //     const expirationTime = tokenData.exp * 1000;
  //     const currentTime = new Date().getTime();
  //     return expirationTime < currentTime;
  //       }

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setNumComments(0);
  };
  const updateNumComments = (videoId) => {
    setNumComments((prevState) => ({
      ...prevState,
      [videoId]: (prevState[videoId] || 0) + 1,
    }));
  };
  const channelId = youtubeData?.fetchYouTubeComment?.channels?.items[0]?.id;

  const handleSubmit = async (videoId) => {
    console.log(videoId);
    console.log(numComments[videoId]);
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    console.log("token data", tokenData.userId);
    const userId = tokenData.userId;
    console.log("inside handleSubmit of dashboard", token);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/video/get-comments/${videoId}`,

      {
        // channelId: channelId,
        // videoId: videoId,
        headers: { authorization: token },
        channelId: channelId,
        userId: userId,
        numOfComments: numComments[videoId],
      }
    );
    console.log(response.data);
  };

  // console.log(youtubeData);
  useEffect(() => {
    setSelectedChannel(null);
    setNumComments(0);
  }, [youtubeData]);

  // console.log(channelId);
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
                          <button
                            type="button"
                            className="btn btn-primary post num"
                            onClick={() => updateNumComments(video.id.videoId)}>
                            {numComments[video.id.videoId] || 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
