import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { fullName: string; email: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "ellahi_users";
const SESSION_KEY = "ellahi_session";

// Simple deterministic hash (not secure - demo only)
function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password + "_ellahi_salt_2026"));
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Seed admin user
function initializeAdminUser() {
  const users = getStoredUsers();
  const adminExists = users.find((u) => u.id === "admin-seed");
  if (!adminExists) {
    const admin: StoredUser = {
      id: "admin-seed",
      fullName: "Ellahi Law Admin",
      email: "admin@ellahilaw.ca",
      passwordHash: hashPassword("Demo@2026"),
      role: "admin",
      createdAt: new Date("2026-01-01").toISOString(),
    };
    users.unshift(admin);
    saveStoredUsers(users);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAdminUser();
    // Restore session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        const users = getStoredUsers();
        const found = users.find((u) => u.id === parsed.id);
        if (found) {
          const { passwordHash: _, ...userWithoutPassword } = found;
          setUser(userWithoutPassword);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error("No account found with that email address.");
    if (!verifyPassword(password, found.passwordHash)) throw new Error("Incorrect password.");
    const { passwordHash: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    if (remember) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id }));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id }));
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id }));
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    const users = getStoredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error("An account with this email already exists.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(password),
      role: "user",
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveStoredUsers(users);
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = async (data: { fullName: string; email: string }) => {
    if (!user) throw new Error("Not authenticated.");
    const users = getStoredUsers();
    const emailConflict = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase() && u.id !== user.id
    );
    if (emailConflict) throw new Error("That email is already in use by another account.");
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) throw new Error("User not found.");
    users[idx] = { ...users[idx], fullName: data.fullName.trim(), email: data.email.toLowerCase().trim() };
    saveStoredUsers(users);
    const updated: User = { ...user, fullName: data.fullName.trim(), email: data.email.toLowerCase().trim() };
    setUser(updated);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error("Not authenticated.");
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) throw new Error("User not found.");
    if (!verifyPassword(currentPassword, users[idx].passwordHash)) {
      throw new Error("Current password is incorrect.");
    }
    if (newPassword.length < 8) throw new Error("New password must be at least 8 characters.");
    users[idx].passwordHash = hashPassword(newPassword);
    saveStoredUsers(users);
  };

  const sendResetEmail = async (email: string): Promise<boolean> => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    // Always return true for security (don't reveal if email exists)
    // In a real app, this would send an email
    return !!found;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, changePassword, sendResetEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
