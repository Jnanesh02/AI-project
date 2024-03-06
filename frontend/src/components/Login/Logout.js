import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/Login");
    localStorage.removeItem("token");
  }
};

const PerformLogout = () => {};

export default Logout;
