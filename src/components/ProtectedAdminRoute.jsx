// components/ProtectedAdminRoute.js
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("admin") === "true";
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedAdminRoute;
