import React, { useEffect, useState } from "react";
import "./CustomerDashboardStyles/Dashboard.css";
import axios from "axios";
import { Dashboard } from "./Dashboard";
import CustomerAccount from "./CustomerAccount";

const CustomerDashboard = () => {
  const [youtubeData, setYoutubeData] = useState([]);
  useEffect(() => {
    getChannelId();
  }, []);
  const getChannelId = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      console.log("token data inside dashboard.js file, ", tokenData);
      const response = await axios.get("http://localhost:3000/dashboard", {
        headers: { authorization: token },
        params: { userId: tokenData.userId },
      });
      setYoutubeData(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Dashboard youtubeData={youtubeData.data} />
        {/* <CustomerAccount data={youtubeData.data}></CustomerAccount> */}
      </div>
    </div>
  );
};

export default CustomerDashboard;
