
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call to your Java backend
    try {
      console.log('Attempting login for:', username);
      // Here you would make an actual API call to your Java backend
      // For now, simulating a successful login
      const mockUser: User = {
        name: username,
        password: '',
        hashed_password: '',
        tickets_booked: [],
        user_id: 'mock-user-id'
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting signup for:', username);
      // Here you would make an actual API call to your Java backend
      // For now, simulating a successful signup
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
