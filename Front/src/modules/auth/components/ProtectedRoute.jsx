import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Si no está logueado → al login
  if (!token) return <Navigate to="/login" replace />;

  // Si está logueado pero NO es admin → también al login
  if (role !== "admin") return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
