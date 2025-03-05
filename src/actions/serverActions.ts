import axios from "axios";
import type { SignupData, LoginData } from "../types/auth";
import type { RestaurantProfile } from "../types/restaurant";
import type { MenuItem } from "../types/menu";

let apiUrl: string = import.meta.env.VITE_PUBLIC_BACKEND_API_URL;

export interface OrderItem {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  status: "PROCESSING" | "COOKING" | "OUT_FOR_DELIVERY" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  restaurantName: string;
  user: string;
  paymentId: string;
  paymentStatus: string;
  paymentMethod: string;
  customerDetails: CustomerDetails;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  email?: string;
}

export const fetchRestaurantOrders = async (
  restaurantId: string | number
): Promise<Order[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/restaurant/getRestaurantOrders`,
      {
        params: { restaurantId: restaurantId.toString() },
      }
    );

    if (response.data && !response.data.error) {
      return response.data.result;
    }

    throw new Error(response.data.error || "Failed to fetch orders");
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: "PROCESSING" | "COOKING" | "OUT_FOR_DELIVERY" | "COMPLETED",
  estimatedDeliveryTime: number,
  deliveryAgentId: string
): Promise<Order[] | null> => {
  try {
    const response = await axios.post(
      `${apiUrl}/restaurant/updateOrderStatus`,
      {
        orderId,
        status,
        estimatedDeliveryTime,
        deliveryAgentId,
      }
    );

    if (!response.data.error) {
      return response.data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    return null;
  }
};

export const createRestaurant = async (
  signupData: SignupData
): Promise<{
  userId: string;
  username: string;
  restaurantId: string;
}> => {
  try {
    const response = await axios.post(`${apiUrl}/restaurant/createRestaurant`, {
      name: signupData.restaurantDetails.name,
      description: signupData.restaurantDetails.description,
      image: signupData.restaurantDetails.image,
      contactNo: signupData.restaurantDetails.contactNo,
      address: signupData.restaurantDetails.address,
      location: signupData.restaurantDetails.location,
      superadminUsername: signupData.username,
      superadminPassword: signupData.password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const authenticateAgent = async (
  loginData: LoginData
): Promise<{
  userId: string;
  username: string;
}> => {
  try {
    const response = await axios.post(
      `${apiUrl}/restaurant/authenticateDeliveryAgent`,
      {
        username: loginData.username,
        password: loginData.password,
      }
    );

    if (response.data && !response.data.error) {
      console.log(response);
      return {
        username: response.data.result.username,
        userId: response.data.result._id,
      };
    }

    throw new Error(response.data.error || "Authentication failed");
  } catch (error) {
    console.error("Error authenticating:", error);
    throw error;
  }
};

export const getCurrentOrder = async (
  deliveryAgentId: string
): Promise<Order | null> => {
  try {
    const response = await axios.get(
      `${apiUrl}/restaurant/getCurrentOrderStatusOfDeliveryAgent`,
      {
        params: { deliveryAgentId },
      }
    );

    if (response.data && !response.data.error) {
      return response.data.result.order;
    }

    return null;
  } catch (error) {
    console.error("Error fetching current order:", error);
    return null;
  }
};

export const getDeliveryAgentOrders = async (
  deliveryAgentId: string
): Promise<Order[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/restaurant/getDeliveryAgentOrders`,
      {
        params: { deliveryAgentId },
      }
    );

    if (response.data && !response.data.error) {
      return response.data.result;
    }

    return [];
  } catch (error) {
    console.error("Error fetching past orders:", error);
    return [];
  }
};

export const markOrderDelivered = async (orderId: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${apiUrl}/restaurant/markOrderDelivered`,
      { orderId }
    );

    return response.data && !response.data.error;
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    return false;
  }
};
