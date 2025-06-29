import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import type JwtPayload  from '../types/jwt'; 
// Define the type of Context value
interface UserContextType {
  user: JwtPayload | null;
  setUser: (user: JwtPayload | null) => void;
  logout: () => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider 
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  // On mount, try to restore user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context (with error if used outside provider)
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};
