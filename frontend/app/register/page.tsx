"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import api from "../lib/api";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaFutbol,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        "Registration Successful"
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 p-4 rounded-full shadow-lg shadow-green-500/40">
            <FaFutbol className="text-white text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2 text-sm text-center">
            Register to book cricket pitches in real-time
          </p>
        </div>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3">
              <FaUser className="text-gray-400 mr-3" />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your full name"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
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

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3">
              <FaLock className="text-gray-400 mr-3" />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Create password"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Confirm Password
            </label>

            <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-4 py-3">
              <FaLock className="text-gray-400 mr-3" />

              <input
                type="password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-lg shadow-green-500/30 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}