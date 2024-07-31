import { useAuth } from '@/context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export default ProtectedRoutes
