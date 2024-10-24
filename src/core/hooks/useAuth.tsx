import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useServices } from "./useServices";

export const useAuth = () => {
  const router = useRouter();
  const { authService } = useServices();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token"),
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = authService.state$.subscribe((state) => {
      setIsAuthenticated(!!state.token);
      setLoading(false);
      if (!state.token) {
        router.navigate({to: "/auth/login"}).then(r => r);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [authService, router]);

  const logout = () => {
    authService.logout();
  };

  const login = (credentials: { login: string; password: string }) => {
    setLoading(true);
    authService.login(credentials);
    router.navigate({to: "/"}).then(r => r);
  };

  return { isAuthenticated, loading, logout, login };
};
