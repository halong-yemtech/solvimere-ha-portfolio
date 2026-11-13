import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import {
  Clients,
  Facts,
  PricingPlans,
  ResumeEntries,
  Services,
  SocialLinks,
  Statistics,
  Testimonials,
  WorkCategories,
  Works,
} from "./cms/collections/content";
import { ContactMessages, GuestbookEntries } from "./cms/collections/inbox";
import { Profile } from "./cms/globals/Profile";
import { Skills } from "./cms/globals/Skills";
import { migrations } from "./cms/migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("PAYLOAD_SECRET is not set. See .env.example.");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — Portfolio CMS" },
  },
  collections: [
    // Inbox
    ContactMessages,
    GuestbookEntries,
    // Profile & About
    SocialLinks,
    Services,
    PricingPlans,
    Clients,
    Testimonials,
    Facts,
    Statistics,
    // Resume
    ResumeEntries,
    // Portfolio
    Works,
    WorkCategories,
    // Settings
    Media,
    Users,
  ],
  globals: [Profile, Skills],
  secret: process.env.PAYLOAD_SECRET || "dev-only-insecure-secret",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({
    client: {
      // Local file by default; a libsql:// URL (Turso) works for serverless hosting.
      url: process.env.DATABASE_URI || "file:./portfolio.db",
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
    // Schema changes go through migrations (cms/migrations) everywhere,
    // so dev and production databases never drift.
    push: false,
    migrationDir: path.resolve(dirname, "cms/migrations"),
    // Applied automatically when the production server starts.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
