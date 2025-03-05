import React from "react";
import { LogOut, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {
  const { agent, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Package className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-lg font-semibold text-gray-900">
            Gobbl
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">{agent?.name}</span>
          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
