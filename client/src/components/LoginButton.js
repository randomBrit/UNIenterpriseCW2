import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from '../firebase';

function LoginButton() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
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