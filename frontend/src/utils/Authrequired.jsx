import UserContext from '@/context/Usercontext'
import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Authrequired = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  if (!user) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/" state={{ from: location.pathname }} />
  }
  return <Outlet />
}
export default Authrequired
