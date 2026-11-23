import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();
  jar.set("os_session", "dev-user", { httpOnly: true, path: "/", sameSite: "lax" });
  return NextResponse.json({ ok: true });
}
