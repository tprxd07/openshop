import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { owner: true, collaborators: { include: { user: true } }, comments: { include: { user: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Volver</Link>
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-4 flex gap-6">
          <div className="w-24 h-24 rounded-3xl bg-[var(--primary)] flex items-center justify-center text-white text-4xl font-bold shrink-0">
            {project.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
            <p className="text-sm text-gray-500">{project.owner.username}</p>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
            <div className="mt-4 flex gap-3">
              {project.releaseUrl && (
                <a href={project.releaseUrl} className="bg-[var(--primary)] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)]">
                  Instalar
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="border border-[var(--primary)] text-[var(--primary)] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#e8f5e9]">
                Ver repo
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2">{project.downloads} descargas{project.releaseTag ? ` · ${project.releaseTag}` : ""}</p>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <h2 className="text-lg font-semibold mb-3">Acerca de esta app</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{project.readme ?? "Sin descripción."}</pre>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <h2 className="text-lg font-semibold mb-3">Colaboradores</h2>
          <ul className="space-y-2">
            {project.collaborators.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">{c.user.username.charAt(0).toUpperCase()}</div>
                <span className="text-sm">{c.user.username} — {c.percent}% ({c.role})</span>
              </li>
            ))}
            {project.collaborators.length === 0 && <li className="text-sm text-gray-500">Sin colaboradores</li>}
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <h2 className="text-lg font-semibold mb-3">Comentarios</h2>
          <ul className="space-y-3">
            {project.comments.map((c) => (
              <li key={c.id} className="border-b pb-3 last:border-0">
                <p className="text-sm font-medium">{c.user.username}</p>
                <p className="text-sm text-gray-600">{c.content}</p>
              </li>
            ))}
            {project.comments.length === 0 && <p className="text-sm text-gray-500">Sin comentarios</p>}
          </ul>
        </section>
      </div>
    </main>
  );
}
