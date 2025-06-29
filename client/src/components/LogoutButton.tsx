// LogoutButton.tsx
import React from 'react';
import { useUser } from '../contexts/UserContext';

const LogoutButton: React.FC = () => {
  const { logout } = useUser();

  return (
    <button onClick={logout} className="text-red-500 px-3 py-1 rounded hover:bg-red-50">
      Logout
    </button>
  );
};

export default LogoutButton;
