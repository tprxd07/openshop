"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/login", { method: "POST" });
    setLoading(false);
    router.push("/apps");
    router.refresh();
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary)] to-[#00a86b] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)] mx-auto flex items-center justify-center text-white font-bold text-xl">O</div>
          <h1 className="text-2xl font-semibold mt-4 text-gray-900">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mt-1">Accede a tu cuenta de OpenShop</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" type="email" placeholder="Email" />
          <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" type="password" placeholder="Contraseña" />
          <button disabled={loading} className="w-full bg-[var(--primary)] text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-600">¿No tienes cuenta? <a href="/signup" className="text-[var(--primary)] font-medium hover:underline">Regístrate</a></p>
      </div>
    </main>
  );
}
