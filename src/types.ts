export interface Order {
  _id: string;
  orderId: string;
  items: {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  status: "PROCESSING" | "COOKING" | "OUT_FOR_DELIVERY" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  restaurantName: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
}

export interface DeliveryAgent {
  id: string;
  name: string;
  isAuthenticated: boolean;
}
