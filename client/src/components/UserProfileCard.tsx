import React from "react";
import type { UserProfileCardProps } from "../types/UserProfileCardProps";

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  avatarUrl,
  name,
  email,
  connectionCount,
}) => {
  // Fallback avatar with ui-avatars
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || email
  )}&background=6366f1&color=fff&size=128&bold=true`;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow flex items-center px-8 py-8 mb-10
                sticky top-0 z-30">
      {/* left：profileimage */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={avatarUrl || fallbackAvatar}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
        />
      </div>
      {/* middle：Connections */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center mb-1">
          {/* bell*/}
          <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">{connectionCount}</span>
        </div>
        <span className="text-base text-gray-600 dark:text-gray-300">Connections</span>
      </div>
      {/* right：info */}
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-300">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
