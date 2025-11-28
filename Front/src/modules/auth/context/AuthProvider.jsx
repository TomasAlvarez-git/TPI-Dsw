// src/context/AuthProvider.jsx
import { createContext, useState } from 'react';
import { login } from '../services/login';
import { frontendErrorMessage } from '../helpers/backendError';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('token'));
  });

  const singout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const singin = async (username, password) => {
    try {
      const { data, error } = await login(username, password);

      if (error) return { error };

      // 🔥 ahora SÍ retornamos token y role
      setIsAuthenticated(true);

      return { token: data.token, role: data.role, error: null };

    } catch (err) {

      const backendCode = err?.response?.data?.code;

      if (backendCode) {
        return { error: { frontendErrorMessage: frontendErrorMessage[backendCode] } };
      }

      return { error: { frontendErrorMessage: 'Llame a soporte' } };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, singin, singout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
