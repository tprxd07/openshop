# OpenShop

Tienda web de apps de GitHub (estilo Play Store). Descubre, instala y publica aplicaciones alojadas en GitHub.

## Stack (MVP actual)

- Next.js 16 (App Router) + Tailwind CSS
- Prisma 7 + SQLite (local, para pruebas)
- Auth por cookie (mock, para pruebas locales)

## Funcionalidades actuales

- Landing page explicativa con CTA para explorar apps y crear cuenta.
- Listado de apps en estilo tarjetas (Play Store).
- Detalle de app: README, colaboradores, comentarios, descarga de release.
- Publicar app (requiere sesión): nombre, slug, repo URL, descripción, release.
- Cuenta de usuario: avatar, banner, bio, GitHub username, apps publicadas.
- Ajustes por categorías: apariencia (tema, paleta, densidad, animaciones), notificaciones, privacidad, cuenta, importación de repos desde GitHub.
- Tema claro/oscuro y paleta de colores dinámica.

## Estado del proyecto

MVP de pruebas locales. Pendiente para versión 1.0:

- Auth real (Supabase / OAuth GitHub).
- Base de datos real (PostgreSQL) en lugar de SQLite.
- Permisos de edición (solo creador/colaboradores).
- Comentarios y contador de descargas funcional.
- Gestión de colaboradores y porcentajes.
- Despliegue a producción (Vercel).

## Cómo ejecutar (local)

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

Ver `.env.example`. Para pruebas locales se usa SQLite (`DATABASE_URL="file:./dev.db"`).

## Licencia

MIT
