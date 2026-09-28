import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);
    api
      .get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (user?.theme === "light") document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
  }, [user?.theme]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refresh = async () => {
    const { data } = await api.get("/auth/me");
    setUser(data);
  };

  const toggleTheme = async () => {
    const newTheme = user?.theme === "light" ? "dark" : "light";
    await api.post("/auth/theme", { theme: newTheme });
    setUser({ ...user, theme: newTheme });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, refresh, toggleTheme, showToast }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-lg z-[100] animate-pulse">
          {toast}
        </div>
      )}
    </AuthContext.Provider>
  );
}