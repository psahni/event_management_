import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext({
  loggedIn: false,
  updateLoginFlag: (_: boolean) => {}
});

const AuthProvider = ({ children }: { children: JSX.Element}) => {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("loggedIn")))

  const updateLoginFlag = (flag: boolean) => {
    setLoggedIn(flag)
  }

  useEffect(() => {
    if (loggedIn) {
      // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("loggedIn", 'true');
    } else {
      // delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("loggedIn");
    }
  }, [loggedIn]);

  const value = useMemo(
    () => ({ loggedIn, updateLoginFlag }), 
    [loggedIn]
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


export  { AuthProvider };

// Better idea to handle refresh, whenver user refresh, bring the login details from server
