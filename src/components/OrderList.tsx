import React, { useState, useEffect } from "react";
import { Order } from "../types";
import { OrderCard } from "./OrderCard";
import {
  getCurrentOrder,
  getDeliveryAgentOrders,
  updateOrderStatus,
} from "../actions/serverActions";
import { useAuth } from "../context/AuthContext";

export const OrderList: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const { agent } = useAuth();

  const fetchPastOrders = async () => {
    if (agent?.id) {
      const orders = await getDeliveryAgentOrders(agent.id);
      setPastOrders(orders);
    }
  };

  useEffect(() => {
    const fetchCurrentOrder = async () => {
      if (agent?.id) {
        const order = await getCurrentOrder(agent.id);
        setCurrentOrder(order);
      }
    };

    if (agent) {
      fetchCurrentOrder();
      fetchPastOrders();
    }
  }, [agent]);

  const handleMarkDelivered = async () => {
    if (!currentOrder) return;

    const success = await updateOrderStatus(
      currentOrder.orderId,
      "COMPLETED",
      0, // No estimated delivery time needed for completion
      agent?.id || ""
    );

    if (success) {
      setPastOrders([{ ...currentOrder, status: "COMPLETED" }, ...pastOrders]);
      setCurrentOrder(null);
      fetchPastOrders();
    }
  };

  return (
    <div className="p-4">
      {currentOrder && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Current Order
          </h2>
          <OrderCard
            order={currentOrder}
            onMarkDelivered={handleMarkDelivered}
            showDeliverButton={true}
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Past Orders
        </h2>
        {pastOrders.length > 0 ? (
          pastOrders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p className="text-gray-600 text-center py-4">No past orders</p>
        )}
      </div>
    </div>
  );
};
