import React from "react";
import { LogOut, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {
  const { agent, logout } = useAuth();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Package className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            Gobbl
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 mr-4">
            {agent?.name}
          </span>
          <button
            onClick={logout}
            className="p-2 -mr-2 text-gray-600 hover:text-primary focus:outline-none transition-colors rounded-lg"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
