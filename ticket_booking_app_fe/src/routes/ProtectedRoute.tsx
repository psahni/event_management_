import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "provider/authProvider"

export const ProtectedRoute = () => {
  const { loggedIn } = useAuth()
  console.log("ProtectedRoute: logged", loggedIn)
  if (!loggedIn) {
    return <Navigate to="/login"></Navigate>
  }

  return <Outlet />
}