import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try { body = (await req.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }); }

  const jar = await cookies();
  const session = jar.get("os_session");
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const userId = session.value;
  try {
    await prisma.profile.upsert({
      where: { id: userId },
      update: {
        username: body.username ? String(body.username).trim() : undefined,
        bio: body.bio !== undefined ? String(body.bio) : undefined,
        avatarUrl: body.avatarUrl ? String(body.avatarUrl).trim() : undefined,
        bannerUrl: body.bannerUrl ? String(body.bannerUrl).trim() : undefined,
        githubUsername: body.githubUsername ? String(body.githubUsername).trim() : undefined,
      },
      create: {
        id: userId,
        email: "dev@local",
        username: body.username ? String(body.username).trim() : "dev",
        bio: body.bio ? String(body.bio) : null,
        avatarUrl: body.avatarUrl ? String(body.avatarUrl).trim() : null,
        bannerUrl: body.bannerUrl ? String(body.bannerUrl).trim() : null,
        githubUsername: body.githubUsername ? String(body.githubUsername).trim() : null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
