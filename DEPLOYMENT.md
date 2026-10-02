# Deploying Drake Portfolio to Vercel

This Next.js 15 App Router project is configured for one-click deployment on **Vercel** with **Supabase Database & Storage**.

---

## 1. Push to GitHub (Clean & Zero Secrets)

All sensitive keys are strictly ignored by `.gitignore` and kept in your local `.env.local`.

Run the following commands in this directory:

```bash
git add .
git commit -m "Complete Drake Portfolio with Supabase & Admin Panel"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

---

## 2. Deploy on Vercel

1. Log into **[vercel.com](https://vercel.com)**.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository (`<YOUR_REPO_NAME>`).
4. Framework Preset will automatically detect **Next.js**.
5. Expand the **Environment Variables** section and add the following 4 variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ihdrnhksglaiyyjazihd.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUz...` *(your anon public key)* | Public Supabase client key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUz...` *(your service role secret key)* | Secret server-side admin key |
| `ADMIN_PASSWORD` | `drake2024` *(or any password you choose)* | Passcode used to log into `/admin` |

6. Click **Deploy**.

---

## 3. Post-Deployment Verification

- **Live Portfolio**: `https://your-domain.vercel.app` (reads dynamic content from Supabase).
- **Admin Panel**: `https://your-domain.vercel.app/admin` (log in with your `ADMIN_PASSWORD`).
- **Contact Inquiries**: Submissions on the live site will directly populate your Supabase database and your `/admin/inbox`.
