import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, accessToken } = useAuthStore();
  if (!accessToken) return <Navigate to="/login" replace />;
  const role = user?.role;
  if (!role || (allowedRoles.length && !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}


