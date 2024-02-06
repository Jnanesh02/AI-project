
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import { OutLlet } from './components/OutLlet';
import { Dashboard } from './components/Dashboard/Dashboard';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
function App() {
  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<OutLlet />} />
   <Route path="dashboard" element={<Dashboard />} />
    </Route>
    <Route path="Features" element={<Features />} />
    <Route path="Pricing" element={<Pricing />} />
    <Route path="Blog" element={<Pricing />} />
    <Route path="Contact-Us" element={<Pricing />} />


  </Routes>
</Router>
  
    </div>
  );
}

export default App;
