import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media file", plural: "Media library" },
  admin: { group: "Settings", description: "Images and files (e.g. your CV PDF) used on the site." },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // Local disk in development / on a VPS. When BLOB_READ_WRITE_TOKEN is set,
    // the Vercel Blob plugin (payload.config.ts) stores files there instead.
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: { description: "Short description for screen readers and SEO." },
    },
  ],
};
