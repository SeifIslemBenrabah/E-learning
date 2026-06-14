import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import RenderRoutes from '../Comp/structure/RenderRoutes';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthWrapper = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : { name: '', isAuthenticated: false };
    } catch {
      return { name: '', isAuthenticated: false };
    }
  });

  const wasAuthenticated = useRef(user.isAuthenticated);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Navigate after the state update is committed so conditional routes are mounted first
  useEffect(() => {
    if (user.isAuthenticated && !wasAuthenticated.current) {
      if (user.role === 'admin') navigate('/admin/Dashboard');
      else if (user.role === 'teacher') navigate('/teacher/Dashboard');
      else navigate('/student/Home');
    }
    wasAuthenticated.current = user.isAuthenticated;
  }, [user.isAuthenticated, user.role, navigate]);

  const login = async (userName, password) => {
    if (!userName || !password) throw new Error('Please fill in both fields');

    const res = await axios.post(`${API_URL}/users/login`, {
      email: userName,
      password,
    });

    const { accessToken, user: userData } = res.data;
    setUser({
      name: userName,
      isAuthenticated: true,
      token: accessToken,
      role: userData.role,
      ...userData,
    });
  };

  const logout = () => {
    wasAuthenticated.current = false;
    setUser({ name: '', isAuthenticated: false });
    localStorage.removeItem('user');
    navigate('/Login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
