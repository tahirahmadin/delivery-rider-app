import React, { useState, useEffect } from "react";
import { History, Package, Timer, MapPin, RefreshCcw } from "lucide-react";
import type { Order } from "../types";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const { agent } = useAuth();

  const refreshOrders = async () => {
    setIsRefreshing(true);
    if (agent?.id) {
      const order = await getCurrentOrder(agent.id);
      setCurrentOrder(order);
    }
    setIsRefreshing(false);
  };

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
    <div className="min-h-[calc(100vh-56px)] bg-gray-50">
      <div className="max-w-lg mx-auto p-4 pb-safe-bottom">
        {!showPastOrders ? (
          <>
            {currentOrder ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Timer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Active Order
                      </h2>
                      <p className="text-sm text-gray-500">
                        Currently delivering
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={refreshOrders}
                      className={`p-2 text-gray-400 hover:text-primary transition-colors ${
                        isRefreshing ? "animate-spin" : ""
                      }`}
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowPastOrders(true)}
                      className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      <History className="w-4 h-4 mr-1" />
                      History
                    </button>
                  </div>
                </div>
                <OrderCard
                  order={currentOrder}
                  onMarkDelivered={handleMarkDelivered}
                  showDeliverButton={true}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center w-full max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Package
                      className="w-10 h-10 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Active Orders
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Waiting for restaurant to assign new orders
                  </p>
                  <button
                    onClick={() => setShowPastOrders(true)}
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    <History className="w-4 h-4 mr-1" />
                    View Past Orders
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order History
                  </h2>
                  <p className="text-sm text-gray-500">Previous deliveries</p>
                </div>
              </div>
              <button
                onClick={() => setShowPastOrders(false)}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Back to Active
              </button>
            </div>
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Package
                    className="w-10 h-10 text-gray-400"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-gray-500">No completed deliveries yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
