import useAuthStore from "@/store/userState";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
