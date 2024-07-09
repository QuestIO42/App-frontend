import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login&Registration/Login';
import Courses from './pages/NotReady/Courses';
import Register from './pages/Login&Registration/Register';
import Course from './pages/NotReady/Course';
import ForgotPassword from './pages/Login&Registration/ForgotPassword';
import Home from './pages/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </Router>
  );
}
