import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Cursos from './pages/Cursos';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/cursos" element={<Cursos />} />
          </Routes>
      </Router>
  );
}

export default App;