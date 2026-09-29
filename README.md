# Sweet Layers — Cake Catalogue & Admin CMS

A full-stack product catalogue for a small bakery. Customers can browse cakes by category.
The owner manages the menu (add, edit, delete, upload photos) from a password-protected
admin dashboard without touching code.

![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=nextdotjs&logoColor=fff)
![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-000?logo=threedotjs&logoColor=fff)
![Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?logo=railway&logoColor=fff)

## Features

- **Public catalogue:** category filters, a detail page for each cake, featured items first, and an interactive 3D hero built with React Three Fiber.
- **Admin CMS:** full CRUD for products with image upload, visibility and "featured" toggles, and manual sort order.
- **Hand-off ready:** business details and categories live in one config file (`src/lib/site-config.ts`), so the owner can change them without touching components.

## Architecture

```
src/
├── app/
│   ├── (site)/            Public pages (catalogue, /cakes/[id]); Server Components
│   ├── admin/             Dashboard, create/edit forms, login
│   ├── actions/           Server Actions: auth.ts (login/logout), cakes.ts (CRUD + uploads)
│   └── media/[file]/      Route handler that serves uploaded images from disk
├── components/            UI components; three/ holds the React Three Fiber scene
├── lib/                   Prisma client, auth/session helpers, data access, site config
└── proxy.ts               Guards every /admin route (Next.js 16 proxy, formerly middleware)
prisma/
├── schema.prisma          Cake model (SQLite)
└── seed.ts                Sample data
```

- **Data:** Prisma ORM over SQLite. Reads go through small functions in `lib/cakes.ts`. Writes go through Server Actions, which call `revalidatePath` so pages update without client-side state.
- **Storage:** the database and uploaded images live on a persistent volume. `DATABASE_URL` and `UPLOAD_DIR` are set per environment, so the same build runs locally and on Railway.

## Security

- **Sessions:** the admin session is an HMAC-SHA256-signed, `httpOnly`, `sameSite=lax` cookie (`secure` in production). Changing `SESSION_SECRET` invalidates every existing session.
- **Constant-time checks:** passwords and session tokens are compared with `crypto.timingSafeEqual`.
- **Two layers of auth:** `/admin` routes are protected by `proxy.ts`, and every mutating Server Action also calls `requireAuth()`. Calling an action directly doesn't get around the check.
- **Upload validation:** uploads are limited to JPEG, PNG, WEBP and GIF under 8 MB and saved under a random UUID filename.
- **No path traversal:** the media route only serves plain filenames with an allow-listed extension.

## Quick start

```bash
# create .env with the variables in the table below
npm install
npm run db:push        # create the SQLite schema
npm run db:seed        # optional sample data
npm run dev            # http://localhost:3000  (admin at /admin)
```

| Variable | Purpose | Example |
| --- | --- | --- |
| `DATABASE_URL` | SQLite file location | `file:./dev.db` |
| `ADMIN_PASSWORD` | Admin login password | — |
| `SESSION_SECRET` | Key used to sign session cookies | long random string |
| `UPLOAD_DIR` | Where uploaded images are stored (optional) | `/data/uploads` |

## Deployment

The app deploys to Railway from `railway.json` (Nixpacks build). On start it runs `prisma db push` and then `next start`. A volume mounted at `/data` stores the database and uploads, so they survive redeploys.

## Roadmap

- Automated tests for the Server Actions and auth helpers (Vitest) plus an end-to-end admin flow test (Playwright)
- GitHub Actions workflow running lint, type-check and build on each pull request
- Image resizing and optimisation on upload

---

## Owner's guide

These instructions are for the shop owner. No coding needed.

### Running it on your computer

You'll need [Node.js](https://nodejs.org) installed (version 20 or newer).

Open a terminal in this folder and run:

```bash
npm install        # first time only — installs everything
npm run dev        # starts the site
```

Then open **http://localhost:3000** in your browser.

- Your public site: http://localhost:3000
- The admin area: http://localhost:3000/admin
  (or click **"Owner login"** at the bottom of any page)

The default admin password is set in the `.env` file. **Change it!** (see below).

---

### Everyday tasks

#### Add / edit / delete cakes
Log in at `/admin`, then use **Add a cake**, **Edit** or **Delete**. Each cake has:
a name, description, price (free text like `from £25`), category, a photo, and two
toggles — *Show on the website* and *Mark as a favourite ⭐*.

#### Change your business name, contact details and categories
Edit **`src/lib/site-config.ts`**. Everything there (shop name, phone, email,
Instagram, WhatsApp, location, and the list of categories) is in plain text with
comments explaining each field.

#### Change the admin password
Open **`.env`** and change `ADMIN_PASSWORD`. Also change `SESSION_SECRET` to any
long random text (this keeps logins secure). Restart the site after editing.

---

### Where things are saved

- **Cakes** → `prisma/dev.db` (the SQLite database file)
- **Photos** → `uploads/` (served via the `/media/...` route)

Keep these two if you ever move the site to a new computer.

---

### Putting it online with Railway

The app stores its database and photos on disk, so it needs a host with a
**persistent volume**. [Railway](https://railway.app) handles this well.

1. **Sign up** at railway.app (you can log in with GitHub).
2. **New Project → Deploy from GitHub repo** and pick `OHURU-IAN/cake-w3b`.
   Railway reads `railway.json` and builds automatically.
3. **Add a Volume** to the service and set its **mount path** to `/data`.
   This is where cakes and photos live so they survive restarts.
4. **Add Variables** (service → Variables):
   - `DATABASE_URL` = `file:/data/app.db`
   - `UPLOAD_DIR` = `/data/uploads`
   - `ADMIN_PASSWORD` = a strong password only you know
   - `SESSION_SECRET` = a long random string
5. **Generate a domain** (service → Settings → Networking → Generate Domain).
   That URL is your live website.

On startup the app creates the database automatically. Then visit
`your-domain/admin` to log in and add your real cakes.

---

### Handy commands

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Run the site locally for development            |
| `npm run build`    | Build the production version                    |
| `npm start`        | Run the built production version                |
| `npm run db:seed`  | Reset the menu to the sample cakes              |
| `npm run db:push`  | Apply database changes after editing the schema |
