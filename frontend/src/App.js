import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { OutLlet } from "./components/OutLlet";
import Login from "./components/Login/Login";
import Features from "./components/Features/Features";
import Pricing from "./components/Pricing/Pricing";
import Signup from "./components/sign-up/Signup";
import Forgot from "./components/Forgot/Forgot";
import { AdminLogin } from "./components/AdminAuthenication/AdminLogin";
import { AdminDashboard } from "./components/AdminAuthenication/AdminDashboard";
import AdminHomePage from "./components/AdminAuthenication/AdminHomePage";
import { AdminProfile } from "./components/AdminAuthenication/AdminProfile";
import CustomerDetails from "./components/AdminAuthenication/CustomerDetails";
import Test from "./Test";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OutLlet />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
          </Route>
          <Route path="Features" element={<Features />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Forgot" element={<Forgot />} />
          <Route path="Blog" element={<Pricing />} />
          <Route path="Contact-Us" element={<Pricing />} />
          <Route path="adminLogin" element={<AdminLogin />}></Route>
          <Route path="adminDashboard" element={<AdminDashboard />}>
            <Route index element={<AdminHomePage />} />
            <Route path="profile" element={<AdminProfile />} />
            {/* <Route path="employeeDetails" element={<EmployeeDetails />}/> */}
            <Route path="customerDetails" element={<CustomerDetails />} />
            {/*             
            <Route path="countryServices" element={<CountryServices />}>
            </Route>
            <Route path="profile" element={<AdminProfile />}>
            </Route>
            <Route path="customerDetails" element={<CustomerDetails />} />
            <Route path="employeeDetails" element={<EmployeeDetails />} /> */}
          </Route>
          <Route path="/test" element={<Test></Test>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
