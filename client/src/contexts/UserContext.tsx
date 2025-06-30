import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type {JwtPayload} from '../types/jwt';   
import type { User } from '../types/user';        
import mapJwtPayloadToUser from '../utils/mapJwtPayloadToUser';


// Type for Context value (user, setUser, logout)
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider: This should wrap your app to provide user info to all children
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // user state is always of type User (not raw JwtPayload)
  const [user, setUser] = useState<User | null>(null);

  // On mount, try to restore user from localStorage token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        // Immediately map to User type
        setUser(mapJwtPayloadToUser(decoded));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Logout clears user and token
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

// Custom hook for using user context
// Ensures you can access user/setUser/logout in any child component
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};
