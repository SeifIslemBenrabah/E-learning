import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import RenderRoutes from "../Comp/structure/RenderRoutes";
import { Navigate, useNavigate } from 'react-router-dom';
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { name: '', isAuthenticated: false };
  });

  useEffect(() => {
  
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async (userName, password) => {
    if (userName && password) {
      try {
        console.log('Attempting login with:', userName);
        const res = await axios.post('http://localhost:5000/users/login', {
          email: userName,
          password: password,
        },
        {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    );

        console.log('Login response:', res);

        const { accessToken,user } = res.data;
        console.log('Access Token:', accessToken);
        console.log('Login successful')
  
        setUser({ name: userName, isAuthenticated: true, token: accessToken,role: user.role, ...user });
        if (user.role === "admin") {
          navigate("/admin/Dashboard"); 
        } if(user.role === "teacher"){
          navigate("/teacher/Dashboard"); 
        }
        else {
          navigate("/"); 
        }
      } catch (error) {
        console.error('Login error:', error.response?.data?.msg || error.message);
      }
    } else {
      throw new Error('Please fill in both fields');
    }
  };
  

  const logout = () => {
    navigate("/"); 
    setUser({ name: '', isAuthenticated: false });
    localStorage.removeItem('user'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

  export default AuthWrapper;
