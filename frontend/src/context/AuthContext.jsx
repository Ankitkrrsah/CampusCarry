
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    axios.defaults.baseURL = "http://localhost:8000/api/v1";
    axios.defaults.withCredentials = true;


    const checkAuth = async () => {
        try {
            
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Auth Check Failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post("/auth/login", { institute_email: email, password });
        setUser(res.data.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        return res.data;
    };

    const register = async (formData) => {
        const res = await axios.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
      
        return res.data;
    };

    const logout = async () => {
        await axios.post("/auth/logout");
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};