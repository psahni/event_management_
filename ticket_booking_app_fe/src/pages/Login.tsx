import { useNavigate } from "react-router-dom";
import { useAuth } from '../provider/authProvider';
import { useEffect } from "react";

const Login = () => {
  const { token, updateToken } = useAuth()
  console.log("token - ", token)
  const navigate = useNavigate();

  const handleLogin = () => {
    updateToken("this is a test token")
    navigate("/", { replace: true })
  };

  useEffect(() => {
    setTimeout(() => {
      handleLogin()
    }, 3 * 1000)
  }, [])

  return <>Login Page</>
}

export default Login