import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import axios from "axios";

const AuthContext = createContext(null);

const API_URL = "http://localhost:3001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const login = useCallback(
    async (username, password) => {
      try {
        const response = await axios.get(
          `${API_URL}/users`,
          {
            params: {
              username,
              password,
            },
          }
        );

        const users = response.data;

        if (users.length === 0) {
          return false;
        }

        const loggedInUser = users[0];

        setUser(loggedInUser);

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        return true;
      } catch (error) {
        console.error(
          "Login error:",
          error
        );

        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth phải nằm trong <AuthProvider>"
    );
  }

  return context;
}