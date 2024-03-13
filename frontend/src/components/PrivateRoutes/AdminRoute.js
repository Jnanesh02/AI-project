import React, { useCallback, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
  const PrivateRoute = () => {
  const navigate = useNavigate();
  const navigateToAdminLogin = useCallback(()=>{
   localStorage.removeItem('token')
    navigate("/adminLogin");
  },[navigate]);
  useEffect(() => {
    function isTokenExpired() {
      const token = localStorage.getItem('token');
      if (!token) {
        return true;
      }
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = new Date().getTime();
      return expirationTime < currentTime;
    }

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        navigateToAdminLogin();
      }
    }, 6000000);

    return () => clearInterval(interval);
  }, [navigateToAdminLogin]);

  const employeeId = localStorage.getItem("token");
  if (!employeeId) {
    return <Navigate to="/adminLogin" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;