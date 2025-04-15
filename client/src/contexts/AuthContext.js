import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children} {/* wait until auth check is done */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}