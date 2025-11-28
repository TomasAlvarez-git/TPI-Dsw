// src/auth/hook/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth no debe ser usado por fuera de AuthProvider');
  }

  const signin = async (username, password) => {
    const { token, role, error } = await context.singin(username, password);

    if (error) return { error };

    // Guardar credenciales
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return { error: null };
  };

  const singout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    context.singout();
  };

  return {
    isAuthenticated: context.isAuthenticated,
    singin: signin,
    singout,
  };
};

export default useAuth;
