// LogoutButton.tsx
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    logout();
    navigate('/'); // To landing page
    
  };

  return (
    <button onClick={handleLogout} className="text-red-500 px-3 py-1 rounded hover:bg-red-50">
      Logout
    </button>
  );
};

export default LogoutButton;
