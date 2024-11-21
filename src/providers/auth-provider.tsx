/* eslint-disable react-refresh/only-export-components */
import { logout } from "@/api/auth";
import { fetchUserInfo } from "@/api/user";
import { login } from "@/features/login";
import { register } from "@/features/register";
import { TLoginRequest, TRegisterRequest, TUser } from "@/types";
import { validateToken } from "@/utils/auth-utils";
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
        const { jwtToken, user } = await login(creds);
        const { roles, email, firstName, id, lastName, username } = user;

        setIsAuthenticated(true);
        setUser({
          id,
          roles,
          email,
          username,
          lastName,
          firstName,
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
      const { jwtToken, user } = await register(creds);
      const { roles, email, firstName, id, lastName, username } = user;

      setIsAuthenticated(true);
      setUser({
        id,
        roles,
        email,
        username,
        lastName,
        firstName,
      });
      localStorage.setItem("jwtToken", jwtToken);
    } catch (error) {
      console.error("Error while registering", error);

      throw error;
    }
  }, []);

  /**
   *
   * Method that logs out the user and redirects to the home page page
   * **/
  const _logout = useCallback(async () => {
    try {
      await logout();

      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("jwtToken");

      navigate("/");
    } catch (error) {
      console.error("Error while logging out", error);

      throw error;
    }
  }, [navigate]);

  /**
   *
   * Method that fetches the user info.
   * **/
  const _getUserInfo = useCallback(async () => {
    try {
      const data = await fetchUserInfo();
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        roles: data.roles,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error while validating token", error);
      _logout();
    }
  }, [_logout]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const { isValid, decodedToken } = validateToken(token);

    if (!isValid || !decodedToken) {
      _logout();
    } else {
      try {
        _getUserInfo();
      } catch (error) {
        console.error("Error while validating token", error);
        _logout();
      }
    }
  }, [_logout, _getUserInfo]);

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
