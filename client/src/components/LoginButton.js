import React from 'react';
import { Button } from 'react-bootstrap';
import { auth, provider } from '../firebase';
import { signInWithRedirect , signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

function LoginButton() {
  const { currentUser: user, setUser } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
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
          <span className="me-2 text-white">Hi, {user.displayName}</span>
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