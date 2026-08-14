# Studio Aura

Production website and content administration panel for Studio Aura. Built with Next.js 16, React 19, Tailwind CSS, and Supabase.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.aeremont.ru
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be the publishable key from the same Supabase project as the URL.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never receive a `NEXT_PUBLIC_` prefix.
- `ADMIN_SESSION_SECRET` should be a long random value, independent from the admin password.
- Apply all variables to Production and Preview in Vercel, then redeploy.

## Supabase setup

Run the SQL and storage setup described in `supabase/README.md`. Public pages fall back to bundled portfolio content when Supabase is unavailable; admin mutations require a working service-role connection.

## Production checks

```bash
npm run lint
npm run test:routes
npm run build
npm audit --omit=dev
```

Expected behavior:

- `/admin` redirects to `/admin/login` without a valid signed session.
- `robots.txt` blocks `/admin` and points to the production sitemap.
- Portfolio data refreshes after admin mutations and at least every five minutes.
- Image uploads accept JPG, PNG, WebP, and AVIF up to 7 MB.

## Deployment

Import the GitHub repository into Vercel, configure the environment variables, and connect both `aeremont.ru` and `www.aeremont.ru`. Use `www.aeremont.ru` as the primary domain and redirect the apex domain to it.
