import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "provider/authProvider"

export const ProtectedRoute = () => {
  const { token } = useAuth()
  console.log("ProtectedRoute: token", token)
  if (!token) {
    return <Navigate to="/login"></Navigate>
  }

  return <Outlet />
}