import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiRegister, apiGetMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('househunt_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      apiGetMe()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      // Default to guest or demo role
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    const { user, token } = res.data;
    setUser(user);
    setToken(token);
    localStorage.setItem('househunt_token', token);
    return user;
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);
    const { user, token } = res.data;
    setUser(user);
    setToken(token);
    localStorage.setItem('househunt_token', token);
    return user;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('househunt_token');
  };

  // Demo Switch helper for fast testing
  const switchDemoRole = async (roleName) => {
    let email = 'user@househunt.tn';
    let password = 'user123';
    if (roleName === 'owner') {
      email = 'owner@househunt.tn';
      password = 'owner123';
    } else if (roleName === 'admin') {
      email = 'admin@househunt.tn';
      password = 'admin123';
    }
    return login(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
