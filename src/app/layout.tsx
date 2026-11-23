import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GearIcon from "@/components/GearIcon";
import LogoutButton from "@/components/LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const instant = false;

export const metadata: Metadata = {
  title: "OpenShop — Tienda de apps de GitHub",
  description: "Descubre, instala y comparte apps de GitHub como en una tienda.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const jar = await cookies();
  const authed = !!jar.get("os_session");
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9fa]">
        <ThemeProvider>
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white font-bold text-lg">O</span>
              <span className="text-xl font-semibold text-gray-900">OpenShop</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <Link href="/apps" className="hover:text-[var(--primary)]">Apps</Link>
              <Link href="/projects/new" className="hover:text-[var(--primary)]">Desarrolladores</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:inline-block bg-[var(--primary)] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Publicar app</Link>
              <Link href="/account" className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 hover:ring-2 hover:ring-[var(--primary)] transition" aria-label="Cuenta">U</Link>
              <GearIcon />
              {authed ? (
                <LogoutButton />
              ) : (
                <Link href="/login" className="text-sm text-gray-700 hover:text-[var(--primary)]">Iniciar sesión</Link>
              )}
            </div>
          </div>
        </nav>
        <div className="flex-1">{children}</div>
        <footer className="bg-white border-t border-gray-100 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
            <span>© 2026 OpenShop · Apps de GitHub</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--primary)]">Privacidad</a>
              <a href="#" className="hover:text-[var(--primary)]">Términos</a>
              <a href="#" className="hover:text-[var(--primary)]">Ayuda</a>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
