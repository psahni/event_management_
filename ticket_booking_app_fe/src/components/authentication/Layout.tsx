import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth.service";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

export default function Layout({ children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.loggedIn) {
      navigate("/", { replace: true })
    }
  }, [])

  return (
    <div className="signup-form">
      {children}
    </div>)
}

