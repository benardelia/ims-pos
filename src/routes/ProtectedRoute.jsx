// ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) return null; // or a loading spinner

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
