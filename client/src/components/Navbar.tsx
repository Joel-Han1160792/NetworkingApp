import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo_cleaned.png';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LogoutButton from './LogoutButton';
import type { User } from '../types/user'

export default function Navbar() {
  const location = useLocation();

  const { user }: { user: User | null } = useUser();

  // Dark mode toggle state
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  // Sync dark mode class with state
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center h-16 px-2">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="cursor-pointer">
          <h3 className="text-2xl font-medium text-blue-500">
            <img
              src={Logo}
              alt="Networking Logo"
              className="w-24 h-auto"
              width={130}
              height={130}
              style={{ imageRendering: 'auto' }}
            />
          </h3>
        </Link>
      </div>

      {/* Nav links */}
      <div className="items-center md:space-x-8 justify-center md:flex md:pt-2 w-full left-0 top-16 px-5 md:px-10 py-3 md:py-0 border-t md:border-t-0">

    <div className="items-center md:space-x-8 justify-center md:flex md:pt-2 w-full left-0 top-16 px-5 md:px-10 py-3 md:py-0 border-t md:border-t-0">
  {user ? (
    <>
      <Link
        to="/profile"
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Home
      </Link>
      <Link
        to="/chatroom"
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Chat Room
      </Link>
      <a
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Pricing
      </a>
      <a
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Blog
      </a>
      <Link
        to="/#about-us"
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        About Us
      </Link>
    </>
  ) : (
    <>
      <a
        href="#hero-section"
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Home
      </a>
      <a
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Chat Room
      </a>
      <a
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Pricing
      </a>
      <a
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        Blog
      </a>
      <a
        href="#about-us"
        className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300"
      >
        About Us
      </a>
    </>
  )}
</div>

      </div>

      {/* Right Side: Auth & Theme Switch */}
      <div className="flex items-center space-x-5 hidden md:flex">
        {/* Dark Mode Button */}
        <button
          onClick={() => setIsDark((d) => !d)}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full
            border border-gray-300 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800
            text-yellow-500 dark:text-gray-100
            transition hover:bg-gray-200 dark:hover:bg-gray-900
            focus:outline-none mr-5
            shadow
          `}
          title="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {/* Dynamic User Auth Area */}
        {!user ? (
  // Unauthenticated: Show Register/Login
  <>
    <Link to={'/register'} className="flex text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors duration-300">
      Register
    </Link>
    <Link to="/login" className="flex text-gray-600 dark:text-blue-400 cursor-pointer transition-colors duration-300">
      Login
    </Link>
  </>
) : (
  // Authenticated: Show Avatar/Name + Logout
  <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-2">
      {/* User Avatar */}
      <img
        src={
          user.avatarUrl
            ? user.avatarUrl
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`
        }
        alt="avatar"
        className="w-9 h-9 rounded-full border border-gray-300 object-cover bg-white"
      />
     
    </div>
    {/* Logout button (external component) */}
    <LogoutButton />
  </div>
)}
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="w-10 h-10 md:hidden justify-self-end rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
    </nav>
  );
}
