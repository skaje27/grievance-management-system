import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Welcome.css";

const Welcome = ({ isAdmin }) => {
  const navigate = useNavigate();

  // Redirect to the appropriate page after 3 seconds
  useEffect(() => {
    const destination = isAdmin ? '/admin' : '/';
    const timer = setTimeout(() => {
      navigate(destination);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, isAdmin]);

  return (
    <div>
      <h1>Hello {isAdmin ? 'admin' : 'user'}</h1>
      <p>Redirecting to {isAdmin ? 'admin page' : 'home page'}...</p>
    </div>
  );
};

export default Welcome;