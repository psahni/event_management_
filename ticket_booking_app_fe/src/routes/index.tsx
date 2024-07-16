import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useAuth } from "provider/authProvider"
import { ProtectedRoute } from "routes/ProtectedRoute"
import Login from "pages/Login"
import Logout from "pages/Logout"

const Routes = () => {
  const { token } = useAuth()
  console.log("Routes: token", token)

  const staticPagesRoutes = [
    {
      path: "/service",
      element: <div>Service Page</div>
    },
    {
      path: "/about-us",
      element: <div>About us</div>
    },
  ];


  const publicRoutes = [
    {
      path: "/",
      element: <div>Home Page</div>
    },
    {
      path: "/login",
      element: <Login />
    }
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <div>User Home Page</div>
        },
        {
          path: "/profile",
          element: <div>User profile</div>
        },
        {
          path: "/logout",
          element: <Logout />
        },
      ]
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...staticPagesRoutes,
    ...(!token ? publicRoutes : []),
    ...protectedRoutes
  ])

  return <RouterProvider router={router} />
}

export default Routes;