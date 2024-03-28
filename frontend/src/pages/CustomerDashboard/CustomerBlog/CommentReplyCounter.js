
import React, { useState, useEffect } from 'react';
import './CommentReplyCounter.css'; // Import CSS file for styling

function CommentReplyCounter() {
  // State to store the number of comments replied
  const [replyCount, setReplyCount] = useState(55);

  // Function to fetch the total count of replied comments from the backend
  const fetchReplyCount = async () => {
    try {
      // Make a request to the backend to fetch the total count of replied comments
      const response = await fetch('your-backend-endpoint');
      const data = await response.json();
      // Update the reply count with the data received from the backend
      setReplyCount(data.replyCount);
    } catch (error) {
      console.error('Error fetching reply count:', error);
    }
  };

  // Fetch the initial count of replied comments when the component mounts
  useEffect(() => {
    fetchReplyCount();
  }, []); // Empty dependency array to run the effect only once on mount

  // You can also set up a polling mechanism here to periodically fetch the updated count from the backend

  return (
    <div className="counter-wrapper card p-5">
      <div className="counter-container">
        {/* Display the big number representing the total count of comments replied */}
        <h1 className="counter">{replyCount}</h1>
        <p className="counter-description">No of the comments replied</p>
      </div>
      <button className='btn-btn-primary sent-anyl'> Platform Performance Comparison </button>
    </div>
  );
}

export default CommentReplyCounter;
