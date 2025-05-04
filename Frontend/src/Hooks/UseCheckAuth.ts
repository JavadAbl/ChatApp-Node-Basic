import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUserStore } from "../Store/UseUserStore";

export function useAuthCheck() {
  const { user, action_checkAuth } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];

    async function checkAuthentication() {
      const isAuthenticated = await action_checkAuth();

      if (isAuthenticated) {
        // Authenticated, but redirect away from public routes
        if (publicRoutes.includes(location.pathname)) {
          navigate("/", { replace: true });
        }
      } else {
        // Not authenticated → only allow public routes
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login", { replace: true });
        }
      }
      setIsCheckingAuth(false);
    }

    if (!user) {
      checkAuthentication();
    } else {
      // If user is already in state, prevent accessing login/register
      if (publicRoutes.includes(location.pathname)) {
        navigate("/", { replace: true });
      }
      setIsCheckingAuth(false);
    }
  }, [action_checkAuth, location.pathname, navigate, user]);

  return { isCheckingAuth };
}
