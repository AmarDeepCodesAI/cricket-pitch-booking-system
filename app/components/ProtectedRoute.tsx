"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      await api.get("/auth/me", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });

      setLoading(false);
    } catch (error) {
      localStorage.removeItem(
        "token"
      );

      router.replace("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}