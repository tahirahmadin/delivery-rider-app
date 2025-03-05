import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewHistory: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onViewHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Order Delivered Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Great job! The order has been marked as completed.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                onViewHistory();
                onClose();
              }}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              View Order History
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-50 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
