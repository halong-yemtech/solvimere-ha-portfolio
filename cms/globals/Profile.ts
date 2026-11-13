import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";

const url = (value: unknown) =>
  !value || /^(https?:\/\/|mailto:|tel:|\/)/.test(String(value)) || "Must be a full URL (https://…)";

export const Profile: GlobalConfig = {
  slug: "profile",
  label: "Profile & Site",
  admin: { group: "Profile & About" },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Profile card",
          fields: [
            { name: "name", type: "text", required: true },
            {
              name: "jobTitle",
              type: "text",
              required: true,
              admin: { description: "Used in the browser tab title and under the quote." },
            },
            {
              name: "typingTitles",
              type: "array",
              labels: { singular: "Title", plural: "Titles" },
              admin: { description: "Animated titles typed under your name." },
              minRows: 1,
              fields: [{ name: "title", type: "text", required: true }],
            },
            { name: "avatar", type: "upload", relationTo: "media", required: true },
            {
              name: "backgroundImages",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              minRows: 1,
              admin: { description: "Slideshow behind the profile photo." },
            },
            {
              name: "cv",
              label: "CV / Resume file",
              type: "upload",
              relationTo: "media",
              admin: { description: "PDF opened by the “Download CV” buttons." },
            },
            {
              type: "row",
              fields: [
                { name: "hireLinkLabel", type: "text", defaultValue: "my upwork", admin: { width: "40%" } },
                { name: "hireLinkUrl", type: "text", validate: url, admin: { width: "60%" } },
              ],
            },
            {
              name: "hireLinkIcon",
              type: "select",
              defaultValue: "SiUpwork",
              options: [
                { label: "Upwork", value: "SiUpwork" },
                { label: "Fiverr", value: "SiFiverr" },
                { label: "LinkedIn", value: "FaLinkedin" },
                { label: "Briefcase", value: "FaBriefcase" },
                { label: "Link", value: "FaLink" },
              ],
            },
            { name: "copyright", type: "text", admin: { description: "Shown at the bottom of the mobile menu." } },
          ],
        },
        {
          label: "About me",
          fields: [
            {
              name: "bio",
              type: "textarea",
              required: true,
              admin: { rows: 8, description: "Supports Markdown: **bold**, *italic*, lists, links." },
            },
            {
              type: "row",
              fields: [
                { name: "age", type: "text", admin: { width: "25%" } },
                { name: "residence", type: "text", admin: { width: "25%" } },
                { name: "status", type: "text", admin: { width: "25%" } },
                { name: "hourlyRate", type: "number", admin: { width: "25%" } },
              ],
            },
            { name: "address", type: "text" },
          ],
        },
        {
          label: "Contact",
          fields: [
            { name: "email", type: "email" },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", admin: { width: "40%" } },
                {
                  name: "phoneLink",
                  type: "text",
                  validate: url,
                  admin: { width: "60%", description: "Where the phone number links to, e.g. https://wa.me/1234567890" },
                },
              ],
            },
            {
              name: "mapEmbedUrl",
              type: "text",
              validate: (v: unknown) =>
                !v || String(v).startsWith("https://www.google.com/maps/embed") ||
                "Use Google Maps → Share → Embed a map, and paste the src URL",
              admin: { description: "Google Maps → Share → Embed a map → copy the src=\"…\" URL." },
            },
          ],
        },
        {
          label: "Quote",
          description: "The quote at the bottom of the Resume section.",
          fields: [
            {
              name: "quote",
              type: "group",
              fields: [
                { name: "text", type: "textarea" },
                {
                  type: "row",
                  fields: [
                    { name: "author", type: "text", admin: { width: "50%", description: "Defaults to your name." } },
                    { name: "role", type: "text", admin: { width: "50%", description: "Defaults to your job title." } },
                  ],
                },
                { name: "image", type: "upload", relationTo: "media", admin: { description: "Defaults to your avatar." } },
              ],
            },
          ],
        },
        {
          label: "Blog section",
          fields: [
            {
              name: "blog",
              type: "group",
              fields: [
                { name: "intro", type: "textarea" },
                {
                  type: "row",
                  fields: [
                    { name: "buttonLabel", type: "text", defaultValue: "view upwork profile", admin: { width: "40%" } },
                    { name: "buttonUrl", type: "text", validate: url, admin: { width: "60%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaDescription",
              type: "textarea",
              admin: { description: "Shown by search engines under your site title." },
            },
          ],
        },
      ],
    },
  ],
};
