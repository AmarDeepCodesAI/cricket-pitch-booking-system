"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/api";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MyBookingsPage() {
  const [bookings, setBookings] =
    useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/bookings/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load bookings"
      );
    }
  };

  return (
    <>
    <ProtectedRoute>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          My Bookings
        </h1>

        <div className="grid gap-5">

          {bookings.length === 0 ? (
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-white">
              No bookings found
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {booking.pitch_name}
                </h2>

                <p className="text-gray-300">
                  {booking.location}
                </p>

                <p className="text-gray-300 mt-2">
                  Date:
                  {" "}
                  {new Date(
                    booking.booking_date
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </p>

                <p className="text-gray-300">
                  Slot:
                  {" "}
                  {booking.start_time}
                  {" - "}
                  {booking.end_time}
                </p>

                <span className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                  {booking.status}
                </span>
              </div>
            ))
          )}

        </div>
      </div>
      </ProtectedRoute>
    </>
  );
}