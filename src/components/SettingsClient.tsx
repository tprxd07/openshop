"use client";
import { useState } from "react";
import { useTheme, COLOR_PRESETS } from "@/components/ThemeProvider";

type Tab = "apariencia" | "notificaciones" | "privacidad" | "cuenta" | "github";

const TABS: { id: Tab; label: string }[] = [
  { id: "apariencia", label: "Apariencia" },
  { id: "notificaciones", label: "Notificaciones" },
  { id: "privacidad", label: "Privacidad" },
  { id: "cuenta", label: "Cuenta" },
  { id: "github", label: "GitHub" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("apariencia");
  const theme = useTheme();

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-[#121212]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Ajustes</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-56 shrink-0">
            <nav className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm p-2 space-y-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition ${
                    tab === t.id ? "bg-[var(--primary)] text-white" : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm p-6 space-y-6">
            {tab === "apariencia" && (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-3">Tema</h2>
                  <div className="flex gap-3">
                    <button onClick={() => theme.setTheme("light")} className={`px-4 py-2 rounded-full text-sm ${theme.theme === "light" ? "bg-[var(--primary)] text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Claro</button>
                    <button onClick={() => theme.setTheme("dark")} className={`px-4 py-2 rounded-full text-sm ${theme.theme === "dark" ? "bg-[var(--primary)] text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Oscuro</button>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3">Color principal</h2>
                  <div className="flex gap-3 flex-wrap">
                    {COLOR_PRESETS.map((c) => (
                      <button
                        key={c}
                        onClick={() => theme.setPrimary(c)}
                        className={`w-10 h-10 rounded-full border-2 transition ${theme.primary === c ? "border-gray-900 dark:border-white scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: c }}
                        aria-label={c}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3">Densidad</h2>
                  <select value={theme.density} onChange={(e) => theme.setDensity(e.target.value as "compact" | "comfortable" | "spacious")} className="border border-gray-200 dark:border-gray-700 rounded-xl p-2 bg-transparent">
                    <option value="compact">Compacta</option>
                    <option value="comfortable">Cómoda</option>
                    <option value="spacious">Espaciosa</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Animaciones</span>
                  <button onClick={() => theme.setAnimations(!theme.animations)} className={`w-11 h-6 rounded-full transition ${theme.animations ? "bg-[var(--primary)]" : "bg-gray-300"} relative`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${theme.animations ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              </>
            )}

            {tab === "notificaciones" && <NotificationsSection />}
            {tab === "privacidad" && <PrivacySection />}
            {tab === "cuenta" && <AccountSection />}
            {tab === "github" && <GithubSection />}
          </section>
        </div>
      </div>
    </main>
  );
}

function NotificationsSection() {
  const [s, setS] = useState({ comments: true, downloads: true, newApps: false, email: true });
  const toggle = (k: keyof typeof s) => setS((x) => ({ ...x, [k]: !x[k] }));
  const items: { key: keyof typeof s; label: string; desc: string }[] = [
    { key: "comments", label: "Comentarios", desc: "Cuando alguien comenta tus apps" },
    { key: "downloads", label: "Descargas", desc: "Resumen de descargas" },
    { key: "newApps", label: "Nuevas apps", desc: "Apps destacadas de la semana" },
    { key: "email", label: "Email", desc: "Recibir notificaciones por email" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notificaciones</h2>
      {items.map((it) => (
        <div key={it.key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
          <div>
            <p className="text-sm font-medium">{it.label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{it.desc}</p>
          </div>
          <button onClick={() => toggle(it.key)} className={`w-11 h-6 rounded-full transition ${s[it.key] ? "bg-[var(--primary)]" : "bg-gray-300"} relative`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${s[it.key] ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function PrivacySection() {
  const [s, setS] = useState({ public: true, showEmail: false });
  const toggle = (k: keyof typeof s) => setS((x) => ({ ...x, [k]: !x[k] }));
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Privacidad</h2>
      {[
        { key: "public" as const, label: "Perfil público", desc: "Otros pueden ver tu perfil y apps" },
        { key: "showEmail" as const, label: "Mostrar email", desc: "Mostrar tu email en el perfil" },
      ].map((it) => (
        <div key={it.key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
          <div>
            <p className="text-sm font-medium">{it.label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{it.desc}</p>
          </div>
          <button onClick={() => toggle(it.key)} className={`w-11 h-6 rounded-full transition ${s[it.key] ? "bg-[var(--primary)]" : "bg-gray-300"} relative`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${s[it.key] ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function AccountSection() {
  const [form, setForm] = useState({ username: "", bio: "", avatarUrl: "", bannerUrl: "", githubUsername: "" });
  const [status, setStatus] = useState("");
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Guardando...");
    const res = await fetch("/api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setStatus(res.ok ? "Guardado" : "Error");
  }
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={save} className="space-y-4">
      <h2 className="text-lg font-semibold">Cuenta</h2>
      <input className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="Username" value={form.username} onChange={set("username")} />
      <textarea className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="Bio" rows={3} value={form.bio} onChange={set("bio")} />
      <input className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="URL avatar" value={form.avatarUrl} onChange={set("avatarUrl")} />
      <input className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="URL banner" value={form.bannerUrl} onChange={set("bannerUrl")} />
      <input className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="GitHub username" value={form.githubUsername} onChange={set("githubUsername")} />
      <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium">Guardar</button>
      {status && <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>}
    </form>
  );
}

function GithubSection() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<{ id: number; name: string; full_name: string; html_url: string; description: string | null }[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function fetchRepos() {
    if (!username) return;
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      if (!res.ok) { setStatus("Usuario no encontrado"); return; }
      const data = await res.json();
      setRepos(data);
    } catch {
      setStatus("Error de red");
    } finally {
      setLoading(false);
    }
  }

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function importSelected() {
    if (selected.size === 0) return;
    setLoading(true);
    setStatus("");
    try {
      const toImport = repos.filter((r) => selected.has(r.id));
      const res = await fetch("/api/github/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ repos: toImport }) });
      const data = await res.json();
      setStatus(res.ok ? `Importados ${data.count} repos` : (data.error ?? "Error"));
    } catch {
      setStatus("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Conectar con GitHub</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Introduce tu username de GitHub para importar repositorios a OpenShop. Solo se publicarán los que selecciones.</p>
      <div className="flex gap-2">
        <input className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-transparent" placeholder="github username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={fetchRepos} disabled={loading} className="bg-[var(--primary)] text-white px-5 py-3 rounded-full font-medium disabled:opacity-50">Buscar</button>
      </div>
      {status && <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>}
      {repos.length > 0 && (
        <>
          <ul className="max-h-80 overflow-auto space-y-2 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
            {repos.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{r.description ?? "Sin descripción"}</p>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={importSelected} disabled={loading || selected.size === 0} className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium disabled:opacity-50">
            Importar seleccionados ({selected.size})
          </button>
        </>
      )}
    </div>
  );
}
