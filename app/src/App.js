import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>} />
              {/* add outras rotas aqui */}
          </Routes>
      </Router>
  );
}

export default App;