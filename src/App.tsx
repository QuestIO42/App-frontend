import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from './components/form/ForgotPassword'
import Home from './pages/Home/Home'
import Login from './pages/Login&Registration/Login'
import Register from './pages/Login&Registration/Register'
import Course from './pages/NotReady/Course'
import Courses from './pages/NotReady/Courses'

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
  )
}
