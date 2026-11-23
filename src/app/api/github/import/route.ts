import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let body: { repos?: { id: number; name: string; full_name: string; html_url: string; description: string | null }[] } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }); }

  const repos = body.repos ?? [];
  if (repos.length === 0) return NextResponse.json({ error: "Sin repos" }, { status: 400 });

  const jar = await cookies();
  const session = jar.get("os_session");
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const userId = session.value;
  await prisma.profile.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: "dev@local", username: "dev" },
  });

  let count = 0;
  for (const r of repos) {
    const slug = r.name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `repo-${r.id}`;
    try {
      await prisma.project.create({
        data: {
          slug: `${slug}-${r.id}`,
          name: r.name,
          description: r.description,
          repoUrl: r.html_url,
          ownerId: userId,
          published: true,
          githubRepoId: String(r.id),
        },
      });
      count++;
    } catch {
      // skip duplicates
    }
  }
  return NextResponse.json({ count });
}
