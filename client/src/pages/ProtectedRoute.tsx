import useAuthStore from "@/store/userState";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetCurrentUser } from "@/apis/api-hooks";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, clearUser, setIsLoggedIn } = useAuthStore();
  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      toast.info("Session expired, please login again");
      clearUser();
    }
    setIsLoggedIn(true);
  }, [currentUser, clearUser]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
