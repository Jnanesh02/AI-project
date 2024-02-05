
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import { OutLlet } from './components/OutLlet';
import { Dashboard } from './components/Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<OutLlet />} />
   <Route path="dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
</Router>
  
    </div>
  );
}

export default App;
