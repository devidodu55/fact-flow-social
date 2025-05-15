
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  username: string;
  email?: string;
  isAnonymous: boolean;
  avatar?: string;
};

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, email?: string) => void;
  loginAnonymously: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user in local storage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, email?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      isAnonymous: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const loginAnonymously = () => {
    const anonymousId = `anonymous-${Date.now().toString(36)}`;
    const newUser: User = {
      id: Date.now().toString(),
      username: anonymousId,
      isAnonymous: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${anonymousId}`,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAnonymously,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
