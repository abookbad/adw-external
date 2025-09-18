"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToAuth } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';

type AuthContextT = { user: User | null; loading: boolean };
const AuthContext = createContext<AuthContextT>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


