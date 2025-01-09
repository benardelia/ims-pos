import { Children, createContext, useContext, useMemo } from "react";
import { data, useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    //function to authenticate user 
    const login = async (data) => {
        setUser(data);
        navigate("/dashboard");
    };
    //function to sign out logged in users 

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true});
    };

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};