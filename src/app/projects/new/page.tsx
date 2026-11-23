import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewProjectForm from "@/components/NewProjectForm";

export default async function NewProjectPage() {
  const jar = await cookies();
  if (!jar.get("os_session")) redirect("/login");
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Publicar nueva app</h1>
        <NewProjectForm />
      </div>
    </main>
  );
}
