import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ isAdmin }) {
  const token = localStorage.getItem("token");

  // ❌ No token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // ❌ Not admin
    if (isAdmin && decoded.role?.toLowerCase() !== "admin") {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;