import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const location = useLocation()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }
  return children
}

export default RequireAuth
