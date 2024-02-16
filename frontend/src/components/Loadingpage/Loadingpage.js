import React from 'react';
// import './LoadingPage.css'; // Create a separate CSS file for styling
import "./Loadingpage.css"
const LoadingPage = () => {
  return (
    <div className="loading">
      <div className="loading-animation"></div>
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingPage;
