import { Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" replace />;
}
