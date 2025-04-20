import { useEffect, useState } from "react";
import { useUserStore } from "../Store/UseUserStore";
import { useNavigate } from "react-router";

export function useAuthCheck() {
  const { user, checkAuth } = useUserStore();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      await checkAuth();
      setIsCheckingAuth(false);
    }

    // If there's no user in the store, check with the server
    if (!user) {
      checkAuthentication();
    } else {
      navigate("/", { replace: true });
      setIsCheckingAuth(false);
    }
  }, [checkAuth, navigate, user]);

  return { isCheckingAuth };
}
