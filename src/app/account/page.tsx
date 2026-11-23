import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function AccountPage() {
  const jar = await cookies();
  if (!jar.get("os_session")) redirect("/login");
  const userId = jar.get("os_session")!.value;
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
    include: { projects: { where: { published: true }, orderBy: { createdAt: "desc" } } },
  });

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <p className="text-gray-500">No hay perfil. Ve a Ajustes para crearlo.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-[var(--primary)] to-[#00a86b]" style={{ backgroundImage: profile.bannerUrl ? `url(${profile.bannerUrl})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="px-6 pb-6 -mt-12">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-[var(--primary)] border-4 border-white overflow-hidden">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
              ) : (
                profile.username.charAt(0).toUpperCase()
              )}
            </div>
            <h1 className="text-2xl font-semibold mt-3 text-gray-900">{profile.username}</h1>
            {profile.bio && <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>}
            {profile.githubUsername && (
              <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-sm text-[var(--primary)] hover:underline">
                GitHub: @{profile.githubUsername}
              </a>
            )}
            <div className="mt-4 flex gap-6 text-sm text-gray-500">
              <span><strong className="text-gray-900">{profile.projects.length}</strong> apps publicadas</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Apps publicadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="bg-white rounded-2xl shadow-sm p-4 flex gap-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold shrink-0">
                {p.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{p.name}</h3>
                <p className="text-xs text-gray-500 truncate">{p.description ?? "Sin descripción"}</p>
              </div>
            </Link>
          ))}
          {profile.projects.length === 0 && <p className="text-gray-500 text-sm">No has publicado apps aún.</p>}
        </div>
      </div>
    </main>
  );
}
