import { useNavigate } from "react-router-dom";
import { useAuth } from '../provider/authProvider';
import { useEffect } from "react";

const Logout = () => {
  const { updateToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    updateToken("");
    navigate("/", { replace: true })
  }

  useEffect(() => {
    setTimeout(() => {
      handleLogout();
    }, 3 * 1000);
  }, []);


  return <>Logout Page</>
}

export default Logout;