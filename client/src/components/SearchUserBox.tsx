import { useState } from "react";
import { Search, UserPlus } from "lucide-react"; // 如果你没用 lucide-react，可以改用 svg

interface SearchUserBoxProps {
  onSearch?: (keyword: string) => void;
  onAddFriend?: (userId: string) => void;
}

export default function SearchUserBox({ onSearch }: SearchUserBoxProps) {
  const [query, setQuery] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  // 可选：按下回车也触发搜索
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 flex items-center px-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
        <input
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search by username or user ID to add friends and start a conversation"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
      </div>
     
    </div>
  );
}
