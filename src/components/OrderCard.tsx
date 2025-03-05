import React from "react";
import { CheckCircle, MapPin, Phone, Timer, Utensils } from "lucide-react";
import { Order } from "../types";

interface OrderCardProps {
  order: Order;
  onMarkDelivered?: () => void;
  showDeliverButton?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onMarkDelivered,
  showDeliverButton = false,
}) => {
  return order ? (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            {order.customerDetails.name}
            <span className="ml-2 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
              #{order.orderId}
            </span>
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-xl">
          <MapPin className="w-5 h-5 text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-gray-700">Delivery Address</div>
            <div className="text-gray-600 mt-0.5">
              {order.customerDetails.address}
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-xl">
          <Phone className="w-5 h-5 text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-gray-700">Contact</div>
            <div className="text-gray-600 mt-0.5">
              {order.customerDetails.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Utensils className="w-5 h-5 text-primary" />
          <h4 className="font-medium text-gray-900">Order Details</h4>
        </div>
        <ul className="space-y-2">
          {order.items?.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={
                    item.image ||
                    `https://images.unsplash.com/photo-1546069901-ba9599a7e63c`
                  }
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-gray-700">
                  {item.name}
                  <span className="text-gray-400 ml-1">×{item.quantity}</span>
                </span>
              </div>
              <span className="font-medium text-gray-900">
                {item.price} AED
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-500">Subtotal</span>
              <div className="font-medium text-gray-900 mt-0.5">
                {order.totalAmount / 100} AED
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {order.status === "COMPLETED"
                  ? "Delivered"
                  : "Out for Delivery"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showDeliverButton && order.status === "OUT_FOR_DELIVERY" && (
        <button
          onClick={onMarkDelivered}
          className="w-full bg-primary text-white py-4 px-4 rounded-xl font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-sm flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Complete Delivery</span>
        </button>
      )}
    </div>
  ) : null;
};
