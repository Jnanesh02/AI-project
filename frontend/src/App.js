
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import { OutLlet } from './components/OutLlet';
import  Login  from './components/Login/Login';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Signup from './components/sign-up/Signup';
import Forgot from './components/Forgot/Forgot';
import { AdminLogin } from './components/AdminAuthenication/AdminLogin';
import { AdminDashboard } from './components/AdminAuthenication/AdminDashboard';
function App() {
  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<OutLlet />} />
   {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
    <Route path="Features" element={<Features />} />
    <Route path="Login" element={<Login />} />
    <Route path="Signup" element={<Signup />} />
    <Route path="Forgot" element={<Forgot />} />
    <Route path="Blog" element={<Pricing />} />
    <Route path="Contact-Us" element={<Pricing />} />
    <Route path="adminLogin" element={<AdminLogin />} ></Route>
    <Route path="adminDashboard" element={<AdminDashboard />} />


  </Routes>
</Router>
  
    </div>
  );
}

export default App;
