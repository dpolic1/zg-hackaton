/* eslint-disable react-refresh/only-export-components */
import { login } from "@/features/login";
import { register } from "@/features/register";
import { TDecodedToken, TLoginRequest, TRegisterRequest, TUser } from "@/types";
import { validateToken } from "@/utils/auth-utils";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TAuthContext = {
  user: TUser | null;
  isAuthenticated: boolean;
  login: (creds: TLoginRequest) => void;
  register: (creds: TRegisterRequest) => void;
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
  // state
  const [user, setUser] = useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  /**
   *
   * Method that logs in the user and tries to redirect to the page the user was trying to access before logging in.
   * **/
  const _login = useCallback(
    async (creds: TLoginRequest): Promise<void> => {
      try {
        const { jwtToken, roles } = await login(creds);
        const decodedToken: TDecodedToken = jwtDecode(jwtToken);

        setIsAuthenticated(true);
        setUser({
          id: decodedToken.id,
          roles,
          email: decodedToken.email,
          username: decodedToken.username,
          lastName: decodedToken.lastName,
          firstName: decodedToken.firstName,
        });
        localStorage.setItem("jwtToken", jwtToken);

        navigate(location.state?.from || "/");
      } catch (error) {
        console.error("Error while logging in", error);

        throw error;
      }
    },
    [location.state?.from, navigate]
  );

  /**
   *
   * Method that registers the user.
   * **/
  const _register = useCallback(async (creds: TRegisterRequest): Promise<void> => {
    try {
      const { jwtToken, roles } = await register(creds);
      const decodedToken: TDecodedToken = jwtDecode(jwtToken);

      setIsAuthenticated(true);
      setUser({
        id: decodedToken.id,
        roles,
        email: decodedToken.email,
        username: decodedToken.username,
        lastName: decodedToken.lastName,
        firstName: decodedToken.firstName,
      });
      localStorage.setItem("jwtToken", jwtToken);
    } catch (error) {
      console.error("Error while registering", error);

      throw error;
    }
  }, []);

  /**
   *
   * Method that logs out the user and redirects to the login page
   * **/
  const _logout = useCallback(async () => {
    try {
      //await logout();

      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("jwtToken");

      navigate("/login");
    } catch (error) {
      console.error("Error while logging out", error);

      throw error;
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const { isValid, decodedToken } = validateToken(token);

    if (!isValid || !decodedToken) {
      _logout();
    } else {
      try {
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          username: decodedToken.username,
          roles: decodedToken.roles,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
        });
        setIsAuthenticated(true);
      } catch (error) {
        _logout();
      }
    }
  }, [_logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: _login,
        register: _register,
        logout: _logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
