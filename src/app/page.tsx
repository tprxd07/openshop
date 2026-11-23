import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#00a86b] to-[#00695c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium mb-4">Beta · Web</span>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight">Tu tienda de apps de GitHub</h1>
            <p className="mt-5 text-lg text-white/90 max-w-2xl">
              OpenShop es una tienda tipo Play Store donde descubres, instalas y compartes aplicaciones publicadas en GitHub.
              Explora repositorios, lee su README, descarga la última release y deja comentarios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apps" className="bg-white text-[var(--primary)] px-7 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                Explorar apps
              </Link>
              <button className="border-2 border-white/60 text-white px-7 py-3 rounded-full font-semibold hover:bg-white/10 transition" disabled>
                Descargar app (próximamente)
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">¿Qué puedes hacer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Descubrir", desc: "Explora apps publicadas por la comunidad con una interfaz familiar y cómoda." },
            { title: "Instalar", desc: "Descarga la última release estable de cualquier proyecto con un clic." },
            { title: "Publicar", desc: "Sube tus propios repositorios de GitHub y compártelos con el mundo." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-xl mb-4">
                {f.title.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">¿Listo para empezar?</h2>
          <p className="text-gray-600 mt-2">Crea tu cuenta y publica tu primera app en minutos.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/signup" className="bg-[var(--primary)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition">Crear cuenta</Link>
            <Link href="/apps" className="border border-gray-300 text-gray-700 px-7 py-3 rounded-full font-semibold hover:bg-gray-50 transition">Ver apps</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
