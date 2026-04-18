import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiService from "../../services/api";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "author";
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  successMessage: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  clearSuccess: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiService.login(email, password);

      if (response.success && response.data) {
        const { user: userData } = response.data as { user: User };
        setUser(userData);
        setSuccessMessage("Login successful!");
        return true;
      } else {
        setError(response.error || "Login failed");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login failed";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiService.register(email, password, name);

      if (response.success) {
        setSuccessMessage("Registration successful! Please log in.");
        return true;
      } else {
        setError(response.error || "Registration failed");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Registration failed";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiService.forgotPassword(email);

      if (response.success) {
        setSuccessMessage("Password reset link sent to your email!");
        return true;
      } else {
        setError(response.error || "Failed to send reset link");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Request failed";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiService.resetPassword(token, password);

      if (response.success) {
        setSuccessMessage("Password reset successful! Please log in.");
        return true;
      } else {
        setError(response.error || "Password reset failed");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Reset failed";
      console.log(err)
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiService.changePassword(oldPassword, newPassword);

      if (response.success) {
        setSuccessMessage("Password changed successfully!");
        return true;
      } else {
        setError(response.error || "Failed to change password");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to change password";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!user?.username) throw new Error("User not authenticated");

      const response = await apiService.updateUserProfile(user.username, data);

      if (response.success && response.data) {
        const updatedUser = response.data as User;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMessage("Profile updated successfully!");
        return true;
      } else {
        setError(response.error || "Failed to update profile");
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setError(null);
    setSuccessMessage(null);
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccessMessage(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        successMessage,
        login,
        register,
        forgotPassword,
        resetPassword,
        changePassword,
        updateProfile,
        logout,
        clearError,
        clearSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
