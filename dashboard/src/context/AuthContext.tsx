import { createContext, useState, ReactNode } from "react";

export type User = {
  name: string;
  role: "parent" | "admin";
};

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  switchRole: (role: "parent" | "admin") => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    setToken(token);
    // For demo, generate dummy user from token
    setUser({ name: "John Doe", role: "parent" });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const switchRole = (role: "parent" | "admin") => {
    if (!user) return;
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
