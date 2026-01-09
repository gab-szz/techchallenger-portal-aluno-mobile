import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../../types";
import { AuthContextData } from "./auth.types";
import { loadStoredAuth, loginService, logoutService } from "./auth.service";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);
    const storedUser = await loadStoredAuth();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { user: loggedUser, success } = await loginService(email, password);
    setUser(loggedUser);
    setLoading(false);
    return success;
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
