import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";
    const [user, setUser] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        age: "",
        contact_number: "",
        permissions: [],
    });
    const login = (user) => {
        setUser({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            contact_number: user.contact_number,
            permissions: ["USER"]
        });
        navigate(redirectPath, { replace: true });
    };
    const logout = () => {
        setUser({
            username: "",
            email: "",
            username: "",
            first_name: "",
            last_name: "",
            age: "",
            contact_number: "",
            email: "",
            username: "", permissions: []
        });
    };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);
};