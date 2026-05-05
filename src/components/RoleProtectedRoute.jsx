import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!role || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;