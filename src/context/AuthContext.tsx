import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DeliveryAgent } from "../types";
import { authenticateAgent } from "../actions/serverActions";

interface AuthContextType {
  agent: DeliveryAgent | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [agent, setAgent] = useState<DeliveryAgent | null>(() => {
    const savedAgent = Cookies.get("agent");
    return savedAgent ? JSON.parse(savedAgent) : null;
  });

  useEffect(() => {
    if (agent) {
      Cookies.set("agent", JSON.stringify(agent), { expires: 7 }); // Expires in 7 days
    } else {
      Cookies.remove("agent");
    }
  }, [agent]);

  const login = async (username: string, password: string) => {
    try {
      const response = await authenticateAgent({
        username,
        password,
      });

      if (response.userId) {
        setAgent({
          id: response.userId,
          name: response.username,
          isAuthenticated: true,
        });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setAgent(null);
    Cookies.remove("agent");
  };

  return (
    <AuthContext.Provider value={{ agent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
