// src/services/login.js
import { instance } from '../../shared/api/axiosInstance';

export const login = async (username, password) => {
  const response = await instance.post('api/auth/login', { username, password });

  const token = response.data.token;

  // Decodificar JWT
  const payload = JSON.parse(atob(token.split(".")[1]));

  const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return {
    data: { token, role: role.toLowerCase() },
    error: null
  };
};
