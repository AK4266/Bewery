import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Auth } from './components/Auth'
import { Home } from './Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
