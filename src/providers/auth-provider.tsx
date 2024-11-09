/* eslint-disable react-refresh/only-export-components */
import { TUser } from "@/types/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type TAuthContext = {
  user: TUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type TAuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const login = useCallback(() => {
    // login logic
  }, []);

  const logout = useCallback(() => {
    // logout logic
  }, []);

  useEffect(() => {
    // init logic
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
