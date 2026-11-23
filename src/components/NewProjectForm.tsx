"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", slug: "", description: "", repoUrl: "", readme: "", releaseTag: "", releaseUrl: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      let data: unknown = null;
      try { data = await res.json(); } catch { data = null; }
      const d = data as { error?: string; slug?: string } | null;
      if (!res.ok) { setError(d?.error ?? "Error al crear el proyecto"); return; }
      if (d?.slug) { router.push(`/projects/${d.slug}`); router.refresh(); }
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Nombre de la app" value={form.name} onChange={set("name")} required />
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Slug (url única, minúsculas y guiones)" value={form.slug} onChange={set("slug")} required pattern="[a-z0-9-]+" />
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="URL del repositorio de GitHub" value={form.repoUrl} onChange={set("repoUrl")} required type="url" />
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Descripción corta" value={form.description} onChange={set("description")} />
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Tag de release (ej: v1.0.0)" value={form.releaseTag} onChange={set("releaseTag")} />
      <input className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="URL de descarga (release)" value={form.releaseUrl} onChange={set("releaseUrl")} type="url" />
      <textarea className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="README / descripción larga" rows={8} value={form.readme} onChange={set("readme")} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button disabled={loading} className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium disabled:opacity-50 hover:opacity-90">
        {loading ? "Publicando..." : "Publicar app"}
      </button>
    </form>
  );
}
