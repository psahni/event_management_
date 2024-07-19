import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useAuth } from "provider/authProvider"
import { ProtectedRoute } from "routes/ProtectedRoute"
import Login from "@pages/Login"
import Logout from "@pages/Logout"
import  Signup from "@pages/Signup"
import Home from "@pages/Home"

let Routes = () => {
  const { loggedIn } = useAuth()
  console.log("Routes: loggedIn", loggedIn)

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
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
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
          path: "/events",
          element: <div>Listing Events</div>
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
    ...(!loggedIn ? publicRoutes : []),
    ...protectedRoutes
  ])

  return <RouterProvider router={router} />
}

export default Routes;