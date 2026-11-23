import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function AppsPage() {
  const projects = await prisma.project.findMany({
    include: { owner: true },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Apps</h1>
          <span className="text-sm text-gray-500">{projects.length} apps</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 p-4 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white text-xl font-bold shrink-0 group-hover:scale-105 transition">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{p.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{p.owner.username}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 line-clamp-2 flex-1">{p.description ?? "Sin descripción"}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">{p.downloads} descargas</span>
                <span className="text-xs font-medium text-[var(--primary)] group-hover:underline">Ver más →</span>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 mb-4">No hay apps aún.</p>
              <Link href="/projects/new" className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium">Publicar la primera</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
