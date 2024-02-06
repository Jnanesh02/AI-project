
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import { OutLlet } from './components/OutLlet';
import { Login } from './components/Login/Login';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Signup from './components/sign-up/Signup';
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
    <Route path="Blog" element={<Pricing />} />
    <Route path="Contact-Us" element={<Pricing />} />


  </Routes>
</Router>
  
    </div>
  );
}

export default App;
