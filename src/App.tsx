import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'


import Home from './pages/Home/Home'
import { AuthProvider } from './context/AuthProvider'
import NotFound from './pages/NotFound/NotFound'
import ProtectedRoutes from './utils/ProtectedRoutes'
import PublicRoute from './utils/PublicRoutes'
import ProfileScreen from './pages/ProfileScreen/ProfileScreen'
import Login from './pages/Login@Registration/Login'
import Register from './pages/Login@Registration/Register'
import Course from './pages/Course/Course'
import Courses from './pages/Courses/Courses'
import ForgotPasswordPage from './pages/Login@Registration/ForgotPasswordPage'
import Practice from './pages/Verilog/Practice'
import Teste from './pages/testPage/index'


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

          </Route>
          <Route path="/not_found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not_found" />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/profile/:userId" element={<ProfileScreen />} />
            <Route path="/test" element={<Teste />} />
            <Route path="/course/:courseId/practice" element={<Practice />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
