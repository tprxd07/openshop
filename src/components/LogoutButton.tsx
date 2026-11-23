"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onClick() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false);
    router.push("/");
    router.refresh();
  }
  return (
    <button onClick={onClick} disabled={loading} className="text-sm text-gray-700 hover:text-[var(--primary)] disabled:opacity-50">
      {loading ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}
