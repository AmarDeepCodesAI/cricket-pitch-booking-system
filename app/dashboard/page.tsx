"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PitchCard from "../components/PitchCard";
import api from "../lib/api";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

interface Pitch {
  id: string;
  name: string;
  location: string;
  price_per_hour: string;
}

export default function Dashboard() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      const res = await api.get("/pitches");

      setPitches(res.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load pitches");
    } finally {
      setLoading(false);
    }
  };

  return (
  <ProtectedRoute>
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 p-8">

        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <div className="mb-10">

            <h1 className="text-5xl font-bold text-white">
              Cricket Pitch Booking
            </h1>

            <p className="text-gray-300 mt-3 text-lg">
              Book premium cricket grounds in real-time and enjoy a seamless booking experience.
            </p>

          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-gray-300 text-sm">
                Total Pitches
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-2">
                {pitches.length}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-gray-300 text-sm">
                Live Booking
              </h3>

              <p className="text-4xl font-bold text-yellow-400 mt-2">
                Real-Time
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-gray-300 text-sm">
                Reservation Timer
              </h3>

              <p className="text-4xl font-bold text-blue-400 mt-2">
                2 Min
              </p>
            </div>

          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-white">
              Available Pitches
            </h2>

            <span className="text-gray-400">
              {pitches.length} Grounds Available
            </span>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 text-center text-white">
              Loading pitches...
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">

              {pitches.map((pitch) => (
                <div
                  key={pitch.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition duration-300"
                >
                  <h2 className="text-2xl font-bold text-white">
                    {pitch.name}
                  </h2>

                  <p className="text-gray-300 mt-2">
                    📍 {pitch.location}
                  </p>

                  <p className="text-green-400 text-xl font-semibold mt-4">
                    ₹{pitch.price_per_hour}/hour
                  </p>

                  <button
                    onClick={() =>
                      window.location.href =
                        `/book-pitch/${pitch.id}`
                    }
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  </ProtectedRoute>
);
}