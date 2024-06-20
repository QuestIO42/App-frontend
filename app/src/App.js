import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Courses from './pages/Courses/Courses';
import Register from './pages/Register/Register';
import HomeLogada from './pages/HomeLogada/HomeLogada';
import Course from './pages/Course/Course';



function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/courses" element={<Courses/>} />
              <Route path="/home" element={<HomeLogada/>} />
              <Route path="/course" element={<Course/>} />
          </Routes>
      </Router>
  );
}

export default App;