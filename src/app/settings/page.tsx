import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/SettingsClient";

export default async function SettingsPage() {
  const jar = await cookies();
  if (!jar.get("os_session")) redirect("/login");
  return <SettingsClient />;
}
