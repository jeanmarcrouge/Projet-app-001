import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { clearSessionUser, getSessionUser, saveSessionUser, SessionUser } from "./auth";

type AuthContextValue = {
  user: SessionUser | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  updateProfile: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email: string) => {
        const derivedName = email.split("@")[0] || "User";
        const sessionUser = { name: derivedName, email };
        saveSessionUser(sessionUser);
        setUser(sessionUser);
      },
      signup: (name: string, email: string) => {
        const sessionUser = { name, email };
        saveSessionUser(sessionUser);
        setUser(sessionUser);
      },
      updateProfile: (name: string, email: string) => {
        const sessionUser = { name, email };
        saveSessionUser(sessionUser);
        setUser(sessionUser);
      },
      logout: () => {
        clearSessionUser();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
