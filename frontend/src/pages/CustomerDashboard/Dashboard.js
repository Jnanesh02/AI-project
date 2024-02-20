import React, { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import youtube from "../../images/avatar.png";
import "./CustomerDashboardStyles/Dashboardyoutube.css";
export const Dashboard = ({ youtubeData }) => { // Destructure youtubeData from props
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [numComments, setNumComments] = useState(0);
    console.log("updateNumComments", youtubeData);

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
        setNumComments(0);
    }
    const updateNumComments = (videoId) => {
        setNumComments(prevState => ({
            ...prevState,
            [videoId]: (prevState[videoId] || 0) + 1
        }));
    };

   
console.log(youtubeData);
    useEffect(() => {
        setSelectedChannel(null);
        setNumComments(0);
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
                                                    <img src={avatar} alt="/" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <p className="active">
                                                        <span>
                                                            {youtubeData.fetchYouTubeComment.channels.title}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    youtubeData?.fetchYouTubeComment?.channels?.map((channel, index) => (
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
                                    ))
                                )}
                        </div>
                        <div className="col-lg-6 main-cont-dashboard">
                            <h5 className="channel-headings">
                                <img className="youtube-icons-dashboard" src={youtube} alt="/" /> Youtube Channel Post
                            </h5>
                            {youtubeData?.fetchYouTubeComment?.videos &&
                                youtubeData.fetchYouTubeComment.videos.map((video, index) => (
                                    <div key={index} className="card dashboard-youtube-card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src={avatar} alt="/" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <p className="channel-post">
                                                        <span>
                                                            {selectedChannel?.title || "Select a channel"}
                                                        </span>
                                                    </p>
                                                    <small>
                                                        <span>{video.snippet.title}</span>
                                                    </small>

                                                    <button type="button" className="btn btn-primary post">
                                                        Post
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary post num"
                                                        onClick={() => updateNumComments(video.id.videoId)}
                                                    >
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

