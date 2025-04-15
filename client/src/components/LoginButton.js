import React from 'react';
import { Button } from 'react-bootstrap';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

function LoginButton() {
  const { user, setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-end">
      {user ? (
        <>
          <span className="me-2">Hi, {user.displayName}</span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="outline-primary" size="sm" onClick={handleLogin}>
          Sign In with Google
        </Button>
      )}
    </div>
  );
}

export default LoginButton;