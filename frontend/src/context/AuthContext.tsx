import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, Role } from "../types";
import axios, { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role, password: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (session persistence)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to restore session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, role: Role, password: string) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, role, password },
        { withCredentials: true }, // IMPORTANT for cookies
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login error:", error);

      // Axios error handling
      if (axiosError.response) {
        // Server responded with error (401, 400, etc)
        throw new Error(
          (axiosError.response.data as any)?.message || "Invalid credentials",
        );
      } else if (axiosError.request) {
        // No response received
        throw new Error("No response from server");
      } else {
        // Something else
        throw new Error(axiosError.message || "Login failed");
      }
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
