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
import Teste from './pages/testPage/index'
import ChangePassword from './pages/Login@Registration/ChangePassword'
import ConfigPass from './pages/Login@Registration/ConfigPass'
import Quiz from './pages/Quizzes/Quiz'
import QuizTries from './pages/Quizzes/QuizTries'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/*Fluxo de autenticação */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/change-password/:verificationCode" element={<ChangePassword />} />
            <Route path="/config-pass/:verificationCode" element={<ConfigPass />} />
          </Route>

          {/*Fluxo do usuário */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<ProfileScreen />} />

            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId/quiz/:quizId" element={<Quiz />} />
            <Route path="/course/:courseId/quiz/:quizId/try/:currentTry" element={<QuizTries />} />
            <Route path="/test" element={<Teste />} />
            {/* <Route path="/course/:courseId/practice" element={<Practice />} /> */}
            {/* <Route path="/exercises" element={<Exercises />} /> */}
            {/* <Route path="/exercises/:quizId" element={<Practice />} /> */}
          </Route>

          {/*Rotas de redirecionamento */}
          <Route path="/not_found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not_found" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
