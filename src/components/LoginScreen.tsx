import React, { useState } from "react";
import { Package, User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      await login(username, password);
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Package className="w-16 h-16 text-primary" strokeWidth={1.5} />
            <img src="https://static.vecteezy.com/system/resources/previews/036/409/627/non_2x/delivery-man-riding-yellow-scooter-deliver-the-package-to-the-customer-cartoon-illustration-illustration-isolated-on-white-background-vector.jpg" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Welcome Rider!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your delivery account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-4 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm mt-6"
          >
            <Package className="w-5 h-5" />
            <span>Start Delivering</span>
          </button>
        </form>
      </div>
    </div>
  );
};
