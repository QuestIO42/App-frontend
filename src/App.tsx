import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login@Registration/Login'
import Register from './pages/Login@Registration/Register'
import Course from './pages/NotReady/Course'
import Courses from './pages/NotReady/Courses'
import ForgotPassword from './pages/Login@Registration/ForgotPassword'
import { AuthProvider } from './context/AuthProvider'
import NotFound from './pages/NotFound/NotFound'
import ProtectedRoutes from './utils/ProtectedRoutes'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/not_found" element={<NotFound />} />
          <Route path="*" element={<Navigate to={'/not_found'}></Navigate>} />

          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course" element={<Course />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
