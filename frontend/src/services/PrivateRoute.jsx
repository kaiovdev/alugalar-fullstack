import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return <Navigate to="/" replace />;
  }

  return children;
}
