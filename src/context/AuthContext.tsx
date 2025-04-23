
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType: 'host' | 'renter') => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'host' | 'renter') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('hostablyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'host' | 'renter') => {
    // In a real app, this would be an API call
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userType === 'host' ? 'Maria Popescu' : 'Johnny Doe',
      email,
      createdAt: new Date().toISOString(),
      userType,
      phone: userType === 'host' ? '+40 123 456 789' : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('hostablyUser', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string, userType: 'host' | 'renter') => {
    // In a real app, this would be an API call
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      createdAt: new Date().toISOString(),
      userType
    };
    
    setUser(mockUser);
    localStorage.setItem('hostablyUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hostablyUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
