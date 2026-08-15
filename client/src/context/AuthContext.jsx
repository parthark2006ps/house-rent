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
    const normalizedRole = roleName ? roleName.toString().toLowerCase() : 'user';
    let email = 'user@househunt.tn';
    let password = 'user123';

    if (normalizedRole === 'owner' || normalizedRole === 'landlord') {
      email = 'owner@househunt.tn';
      password = 'owner123';
    } else if (normalizedRole === 'admin') {
      email = 'admin@househunt.tn';
      password = 'admin123';
    } else if (normalizedRole === 'user' || normalizedRole === 'renter' || normalizedRole === 'tenant') {
      email = 'user@househunt.tn';
      password = 'user123';
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
