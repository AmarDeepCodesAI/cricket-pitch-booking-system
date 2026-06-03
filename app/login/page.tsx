"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "../lib/api";

import {
  FaEnvelope,
  FaLock,
  FaFutbol,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 p-4 rounded-full shadow-lg shadow-green-500/40">
            <FaFutbol className="text-white text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Cricket Booking
          </h1>

          <p className="text-gray-300 mt-2 text-sm">
            Login to continue booking your pitch
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3 focus-within:border-green-500 transition">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3 focus-within:border-green-500 transition">
              <FaLock className="text-gray-400 mr-3" />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-lg shadow-green-500/30 disabled:opacity-50"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}