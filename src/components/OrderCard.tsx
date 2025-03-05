import React from "react";
import { CheckCircle, Clock, Package } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {order.customerDetails.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            <strong>Address:</strong> {order.customerDetails.address}
          </p>
          <p className="text-gray-500 text-sm">
            Phone: {order.customerDetails?.phone}
          </p>

          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700">Items:</h4>
            <ul className="mt-1 space-y-1">
              {order.items?.map((item) => (
                <li key={item.name} className="text-sm text-gray-600">
                  • {item.name} x{item.quantity} ({item.price} AED)
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center text-sm">
            {order.status === "COMPLETED" ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <Package className="w-4 h-4 text-orange-500 mr-1" />
            )}
            <span
              className={
                order.status === "COMPLETED"
                  ? "text-green-500"
                  : "text-orange-500"
              }
            >
              {order.status}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Total Amount: {order.totalAmount / 100} AED
          </div>
        </div>
      </div>

      {showDeliverButton && order.status === "OUT_FOR_DELIVERY" && (
        <button
          onClick={onMarkDelivered}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Mark as Delivered
        </button>
      )}
    </div>
  ) : null;
};
