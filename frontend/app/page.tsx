import Link from "next/link";
import {
  FaFutbol,
  FaBolt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Hero Section */}
        <div className="text-center">

          <div className="inline-flex items-center justify-center bg-green-500 p-5 rounded-full shadow-lg shadow-green-500/40 mb-8">
            <FaFutbol className="text-white text-5xl" />
          </div>

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Cricket Pitch
            <span className="text-green-400">
              {" "}Booking System
            </span>
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Reserve cricket pitches in real-time with
            secure booking, live availability updates,
            instant reservations, and seamless scheduling.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 transition duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/30"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition duration-300 px-8 py-4 rounded-xl font-semibold"
            >
              Create Account
            </Link>

          </div>

        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <FaBolt className="text-white text-2xl" />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              Real-Time Booking
            </h3>

            <p className="text-gray-300">
              Instantly reserve slots and see live
              availability updates through Socket.io.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <div className="bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <FaClock className="text-white text-2xl" />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              Smart Reservation
            </h3>

            <p className="text-gray-300">
              Hold your selected slot for 2 minutes
              before confirming the booking.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <div className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <FaShieldAlt className="text-white text-2xl" />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              Secure & Reliable
            </h3>

            <p className="text-gray-300">
              JWT authentication, PostgreSQL storage,
              and concurrency-safe booking protection.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">

          <h2 className="text-4xl font-bold text-white">
            Ready to Book Your Next Match?
          </h2>

          <p className="text-gray-300 mt-4">
            Join now and reserve your favorite cricket pitch in seconds.
          </p>

          <Link
            href="/register"
            className="inline-block mt-8 bg-green-500 hover:bg-green-600 transition text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/30"
          >
            Get Started
          </Link>

        </div>

      </div>
    </main>
  );
}