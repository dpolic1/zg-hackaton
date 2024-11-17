/* eslint-disable react-refresh/only-export-components */
import { login, logout, register } from "@/api/auth";
import { TDecodedToken, TLoginRequest, TRegisterRequest, TUser } from "@/types";
import { validateToken } from "@/utils/auth-utils";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TAuthContext = {
  user: TUser | null;
  isAuthenticated: boolean;
  login: (creds: TLoginRequest) => void;
  register: (creds: TRegisterRequest) => void;
  logout: () => void;
  initAuth: (fromPathname?: string) => void;
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

  // refs
  const isFirstRenderRef = useRef<boolean>(true);
  const isInitializingAuthRef = useRef<boolean>(true);

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

        localStorage.removeItem("jwtToken");
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

        // redirect to the page the user was trying to access before logging in, or to the home page.
        const from = new URLSearchParams(location.search).get("from");
        navigate(from ?? "/");
      } catch (error) {
        console.error("Error while logging in", error);

        throw error;
      }
    },
    [location.search, navigate]
  );

  /**
   *
   * Method that registers the user.
   * **/
  const _register = useCallback(async (creds: TRegisterRequest): Promise<void> => {
    try {
      const { jwtToken, roles } = await register(creds);
      const decodedToken: TDecodedToken = jwtDecode(jwtToken);

      localStorage.removeItem("jwtToken");
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
      await logout();

      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("jwtToken");

      navigate("/login");
    } catch (error) {
      console.error("Error while logging out", error);

      throw error;
    }
  }, [navigate]);

  /**
   * Method that initializes the authentication state.
   */
  const _initAuth = useCallback(
    (fromPathname?: string) => {
      if (isFirstRenderRef.current) return;

      isInitializingAuthRef.current = true;

      const publicRoutes = ["/login", "/register"];
      const jwtToken = localStorage.getItem("jwtToken");

      try {
        const { isValid, decodedToken } = validateToken(jwtToken);

        if (!isValid || !decodedToken) {
          const urlSearchParams = new URLSearchParams({ from: fromPathname ?? "/" });
          navigate(`/login?${urlSearchParams}`);
          return;
        }

        if (publicRoutes.includes(fromPathname ?? "")) {
          navigate("/");
          return;
        }

        setIsAuthenticated(true);
        setUser({
          id: decodedToken.id,
          roles: decodedToken.roles,
          email: decodedToken.email,
          username: decodedToken.username,
          lastName: decodedToken.lastName,
          firstName: decodedToken.firstName,
        });
      } catch (error) {
        console.error("Error while decoding the token", error);
        navigate("/login");
      } finally {
        isInitializingAuthRef.current = false;
      }
    },
    [navigate]
  );

  useEffect(() => {
    _initAuth();
    isFirstRenderRef.current = false;
  }, [_initAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: _login,
        register: _register,
        logout: _logout,
        initAuth: _initAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
