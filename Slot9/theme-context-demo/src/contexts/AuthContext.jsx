import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const login = useCallback(
    (username, password) => {
      if (
        username === "admin" &&
        password === "123"
      ) {
        const userData = {
          username,
          role: "admin",
        };

        setUser(userData);

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        return true;
      }

      return false;
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
      isAuthenticated: !!user,
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

  if (!context) {
    throw new Error(
      "useAuth phải nằm trong <AuthProvider>"
    );
  }

  return context;
}