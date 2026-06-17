# 🍰 Sweet Layers — cake catalogue website

A simple, good-looking website to show off your cakes, with a private admin area
where **you** add, edit and delete cakes (and upload photos) — no coding needed.

- **Public site** (`/`) — your cake menu, category filters, a page per cake, and
  a "How to order" section with your contact details.
- **Owner admin** (`/admin`) — password-protected. Manage your cakes here.

Built with Next.js, Tailwind CSS and a SQLite database (a single file — no setup).

---

## Running it on your computer

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

## Everyday tasks

### Add / edit / delete cakes
Log in at `/admin`, then use **Add a cake**, **Edit** or **Delete**. Each cake has:
a name, description, price (free text like `from £25`), category, a photo, and two
toggles — *Show on the website* and *Mark as a favourite ⭐*.

### Change your business name, contact details and categories
Edit **`src/lib/site-config.ts`**. Everything there (shop name, phone, email,
Instagram, WhatsApp, location, and the list of categories) is in plain text with
comments explaining each field.

### Change the admin password
Open **`.env`** and change `ADMIN_PASSWORD`. Also change `SESSION_SECRET` to any
long random text (this keeps logins secure). Restart the site after editing.

---

## Where things are saved

- **Cakes** → `prisma/dev.db` (the SQLite database file)
- **Photos** → `uploads/` (served via the `/media/...` route)

Keep these two if you ever move the site to a new computer.

---

## Putting it online with Railway

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

## Handy commands

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Run the site locally for development            |
| `npm run build`    | Build the production version                    |
| `npm start`        | Run the built production version                |
| `npm run db:seed`  | Reset the menu to the sample cakes              |
| `npm run db:push`  | Apply database changes after editing the schema |
