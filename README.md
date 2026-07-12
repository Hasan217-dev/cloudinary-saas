# AI Cloudinary SaaS Creative Hub 🎨

A full-stack media management SaaS built with **Next.js**, **Cloudinary**, **Clerk**, and **Prisma (PostgreSQL/Neon)**. Upload, compress, preview, and share images and videos with automatic optimization powered by Cloudinary.

> ⚠️ **Status:** In active development — not yet deployed to production.

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-in/sign-up via [Clerk](https://clerk.com)
- 🎥 **Video Upload & Compression** — Upload videos, auto-compress via Cloudinary, and view compression stats (original vs. compressed size)
- 🖼️ **Image Upload** — Upload and optimize images
- 📊 **Video Library** — Browse uploaded videos with thumbnails, hover-to-preview, duration, and file size details
- 🔗 **Social Share** — Share optimized media across platforms
- ⬇️ **One-click Download** — Download full-resolution processed videos
- 🗄️ **PostgreSQL (Neon) + Prisma ORM** — Persistent storage for video/image metadata

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Framework      | Next.js (App Router)                |
| Auth           | Clerk                               |
| Media Storage  | Cloudinary                          |
| Database       | PostgreSQL (Neon, serverless)       |
| ORM            | Prisma (`@prisma/adapter-pg`)       |
| UI Components  | React, Tailwind CSS, DaisyUI, lucide-react |
| Date Handling  | Day.js                              |
| File Size Format | `filesize` npm package             |

---

## 📁 Project Structure (relevant parts)

```
cloudinary-saas/
├── app/
│   ├── (app)/
│   │   └── home/
│   │       └── page.tsx        # Video library / dashboard
│   ├── api/
│   │   └── video-upload/
│   │       └── route.ts        # Handles video upload + Cloudinary + DB save
│   └── generated/
│       └── prisma/             # Generated Prisma client
├── components/
│   └── VideoCard.tsx           # Video card UI (thumbnail, preview, stats, download)
├── prisma/
│   └── schema.prisma           # Database schema
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## 🗃️ Database Schema

```prisma
model videos {
  id             String   @id @default(cuid())
  title          String
  description    String?
  public_id      String
  orignalSize    String
  compressedSize String
  duration       Float
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

> **Note:** The `orignalSize` field name has an intentional-for-now typo (missing "i"). It's kept as-is throughout the codebase (schema, API route, and `VideoCard.tsx`) to avoid running a database migration during active local development. Fix this to `originalSize` before any production deployment for cleanliness.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` (if present) or create `.env` as shown above.

### 3. Generate Prisma client & sync database
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐛 Known Issues / TODO

- [ ] Rename `orignalSize` → `originalSize` across schema, API route, and frontend (requires a safe `RENAME COLUMN` migration, not a drop/add)
- [ ] Add validation for missing/invalid file sizes before saving to DB
- [ ] Add loading and error states for video upload
- [ ] Deployment setup (Vercel / other) — not yet configured
- [ ] Add tests for upload and compression flows

---

## 📄 License

Private project — not licensed for public/commercial use yet.
