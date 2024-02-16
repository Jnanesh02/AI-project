import React, { useEffect,useState } from "react";
import "./CustomerDashboardStyles/Dashboard.css";
import axios from "axios";
import { Dashboard } from "./Dashboard";


const CustomerDashboard = () => {
  const [youtubeData,setYoutubeData]=useState([]);
  useEffect(() => {
    getChannelId();
  }, []);
  const getChannelId = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard");
      setYoutubeData(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Dashboard youtubeData={youtubeData.data}/>
      </div>
    </div>
  );
};

export default CustomerDashboard;
