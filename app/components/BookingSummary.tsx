"use client";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

interface Props {
  pitch: string;
  date: string;
  slot: string;
  price: number;
}

export default function BookingSummary({
  pitch,
  date,
  slot,
  price,
}: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        Booking Summary
      </h2>

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

      <div className="mt-6 border-t border-white/10 pt-4">

        <div className="flex justify-between items-center">

          <span className="text-gray-400">
            Status
          </span>

          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            Pending
          </span>

        </div>

      </div>
    </div>
  );
}