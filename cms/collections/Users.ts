import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin user", plural: "Admin users" },
  admin: { useAsTitle: "email", group: "Settings" },
  auth: true,
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: "name", type: "text" }],
};
