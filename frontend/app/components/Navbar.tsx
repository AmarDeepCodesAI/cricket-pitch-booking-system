"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      setName(payload.name);
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <nav className="bg-green-700 text-white p-4">

      <div className="container mx-auto flex justify-between items-center">

        <Link
          href="/dashboard"
          className="font-bold text-lg"
        >
          Cricket Booking
        </Link>

        <div className="flex items-center gap-6">

          <span className="text-green-100">
            👋 Hi, {name}
          </span>

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/my-bookings">
            My Bookings
          </Link>

          <button
            onClick={handleLogout}
            className="hover:text-red-200"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}