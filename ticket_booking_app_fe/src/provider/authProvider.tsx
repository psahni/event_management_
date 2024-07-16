import axios from "axios";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext({
  token: '',
  updateToken: (_: string) => {}
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const updateToken = (newToken: string) => {
    setToken(newToken)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = useMemo(
    () => ({ token, updateToken }), 
    [token]
  );
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
}


export default AuthProvider;