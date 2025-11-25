import { instance } from "../../shared/api/axiosInstance";

export const signup = async (data) => {
  try {
    const endpoint =
      data.role === "Admin"
        ? "/api/auth/registerAdmin"
        : "/api/auth/registerUser";

    // Construimos exactamente el DTO que pide el backend
    const payload = {
      username: data.username,
      password: data.password,
      email: data.email,
      phoneNumber: data.phoneNumber
    };

    const response = await instance.post(endpoint, payload);

    return {
      token: response.data?.token || null,
      role: response.data?.role || data.role,
      error: null
    };

  } catch (error) {
    return {
      token: null,
      role: null,
      error:
        error.response?.data?.message ||
        "Error en el registro"
    };
  }
};
