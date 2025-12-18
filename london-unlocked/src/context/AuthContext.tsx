import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, name?: string) => void;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isGuest: false,
    userName: undefined,
    userEmail: undefined,
  });

  const login = (email: string, name?: string) => {
    setAuthState({
      isAuthenticated: true,
      isGuest: false,
      userName: name,
      userEmail: email,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isGuest: false,
      userName: undefined,
      userEmail: undefined,
    });
  };

  const continueAsGuest = () => {
    setAuthState({
      isAuthenticated: false,
      isGuest: true,
      userName: undefined,
      userEmail: undefined,
    });
  };

  const deleteAccount = () => {
    // In a real app, this would make an API call to delete the account
    setAuthState({
      isAuthenticated: false,
      isGuest: false,
      userName: undefined,
      userEmail: undefined,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        continueAsGuest,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

