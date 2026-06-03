"use client";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pitch: string;
  date: string;
  slot: string;
  price: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  pitch,
  date,
  slot,
  price,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <h2 className="text-2xl font-bold text-white">
            Confirm Booking
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6">

          <p className="text-gray-400 mb-6">
            Please review your booking details before confirming.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-3 text-gray-300">
              <FaMapMarkerAlt className="text-green-400" />
              <span>{pitch}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <FaCalendarAlt className="text-green-400" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <FaClock className="text-green-400" />
              <span>{slot}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <FaMoneyBillWave className="text-green-400" />
              <span>₹{price}</span>
            </div>

          </div>

          <div className="mt-6 border-t border-white/10 pt-5">

            <div className="flex justify-between items-center">

              <span className="text-gray-400">
                Booking Status
              </span>

              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                Pending Confirmation
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-white/10">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-500 text-gray-300 hover:bg-white/10 transition py-3 rounded-lg font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-green-500 hover:bg-green-600 transition py-3 rounded-lg font-semibold text-white shadow-lg shadow-green-500/20"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
}