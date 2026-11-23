import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const jar = await cookies();
  const session = jar.get("os_session");
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const slug = String(body?.slug ?? "").trim();
  const repoUrl = String(body?.repoUrl ?? "").trim();

  if (!name || !slug || !repoUrl) {
    return NextResponse.json({ error: "name, slug y repoUrl son obligatorios" }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "slug inválido (solo minúsculas, números y guiones)" }, { status: 400 });
  }

  const userId = session.value;
  try {
    await prisma.profile.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: "dev@local", username: "dev" },
    });

    const project = await prisma.project.create({
      data: {
        slug,
        name,
        description: body.description ? String(body.description).trim() : null,
        repoUrl,
        readme: body.readme ? String(body.readme) : null,
        releaseTag: body.releaseTag ? String(body.releaseTag).trim() : null,
        releaseUrl: body.releaseUrl ? String(body.releaseUrl).trim() : null,
        ownerId: userId,
      },
    });
    return NextResponse.json({ slug: project.slug });
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002") {
      return NextResponse.json({ error: "El slug ya existe" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 });
  }
}
