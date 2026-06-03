"use client";

import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

interface Props {
  duration?: number;
  onExpire: () => void;
}

export default function ReservationTimer({
  duration = 120,
  onExpire,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = String(
    Math.floor(timeLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">

      <div className="flex items-center gap-3 mb-4">
        <FaClock className="text-green-400 text-xl" />

        <h2 className="text-xl font-bold text-white">
          Reservation Active
        </h2>
      </div>

      <p className="text-gray-400 mb-4">
        Complete your booking before timer expires.
      </p>

      <div className="text-center">
        <div className="text-5xl font-bold text-green-400">
          {minutes}:{seconds}
        </div>

        <p className="text-gray-400 mt-3">
          Time Remaining
        </p>
      </div>

    </div>
  );
}