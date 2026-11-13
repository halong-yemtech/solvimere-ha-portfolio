import type { CollectionConfig, Field } from "payload";
import { anyone, authenticated } from "../access";
import { iconField } from "../fields/icon";

const url = (value: unknown) =>
  !value || /^(https?:\/\/|mailto:|tel:|\/)/.test(String(value)) || "Must be a full URL (https://…)";

/** Public-read, admin-write, drag-to-reorder list shown on the site. */
function contentCollection(
  config: Omit<CollectionConfig, "access" | "fields"> & { fields: Field[] }
): CollectionConfig {
  return {
    orderable: true,
    access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
    ...config,
    admin: { pagination: { defaultLimit: 50 }, ...config.admin },
  };
}

export const SocialLinks = contentCollection({
  slug: "social-links",
  labels: { singular: "Social link", plural: "Social links" },
  admin: {
    group: "Profile & About",
    useAsTitle: "label",
    defaultColumns: ["label", "url", "icon"],
    description: "Icons under your name, in the side menu, and the Links list on the Stats page.",
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "url", type: "text", required: true, validate: url },
    iconField(),
    {
      type: "row",
      fields: [
        {
          name: "color",
          type: "text",
          defaultValue: "#ffffff",
          validate: (v: unknown) => !v || /^#[0-9a-fA-F]{3,8}$/.test(String(v)) || "Hex color like #0A66C2",
          admin: { width: "30%", description: "Brand color (hex)." },
        },
        { name: "info", type: "text", admin: { width: "70%", description: "Subtitle on the Stats page." } },
      ],
    },
  ],
});

export const Services = contentCollection({
  slug: "services",
  admin: { group: "Profile & About", useAsTitle: "title", defaultColumns: ["title", "icon"] },
  fields: [
    { name: "title", type: "text", required: true },
    iconField(),
    { name: "description", type: "textarea", required: true },
  ],
});

export const PricingPlans = contentCollection({
  slug: "pricing-plans",
  labels: { singular: "Pricing plan", plural: "Pricing plans" },
  admin: { group: "Profile & About", useAsTitle: "name", defaultColumns: ["name", "price", "period"] },
  fields: [
    { name: "name", type: "text", required: true },
    iconField({ defaultValue: "DiCodeigniter" }),
    {
      type: "row",
      fields: [
        { name: "price", type: "number", required: true, admin: { width: "50%" } },
        { name: "period", type: "text", defaultValue: "hour", admin: { width: "50%", description: "e.g. hour, month, project" } },
      ],
    },
    { name: "orderUrl", type: "text", required: true, validate: url, admin: { description: "Where “order now” links to." } },
    {
      name: "features",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            { name: "feature", type: "text", required: true, admin: { width: "75%" } },
            { name: "included", type: "checkbox", defaultValue: true, admin: { width: "25%" } },
          ],
        },
      ],
    },
  ],
});

export const Clients = contentCollection({
  slug: "clients",
  admin: { group: "Profile & About", useAsTitle: "name", defaultColumns: ["name", "url"] },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "url", type: "text", required: true, validate: url },
    iconField({ required: false, admin: { description: "Used when no logo image is uploaded." } }),
    { name: "logo", type: "upload", relationTo: "media", admin: { description: "Optional logo (overrides the icon)." } },
  ],
});

export const Testimonials = contentCollection({
  slug: "testimonials",
  admin: { group: "Profile & About", useAsTitle: "name", defaultColumns: ["name", "role"] },
  fields: [
    { name: "quote", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "role", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "photo", type: "upload", relationTo: "media" },
  ],
});

export const Facts = contentCollection({
  slug: "facts",
  labels: { singular: "Fun fact", plural: "Fun facts" },
  admin: { group: "Profile & About", useAsTitle: "description" },
  fields: [iconField(), { name: "description", type: "text", required: true }],
});

export const ResumeEntries = contentCollection({
  slug: "resume-entries",
  labels: { singular: "Resume entry", plural: "Resume entries" },
  admin: { group: "Resume", useAsTitle: "title", defaultColumns: ["title", "type", "period", "subtitle"] },
  fields: [
    {
      name: "type",
      type: "radio",
      required: true,
      defaultValue: "experience",
      options: [
        { label: "Experience", value: "experience" },
        { label: "Education", value: "education" },
      ],
      admin: { layout: "horizontal" },
    },
    {
      name: "period",
      type: "text",
      required: true,
      admin: { description: "e.g. 2019 - Present (entries ending in “Present” are highlighted)." },
    },
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "text", admin: { description: "Company or school." } },
    { name: "description", type: "textarea" },
  ],
});

export const Statistics = contentCollection({
  slug: "statistics",
  labels: { singular: "Statistic", plural: "Statistics" },
  admin: { group: "Profile & About", useAsTitle: "title", defaultColumns: ["title", "value"], description: "Cards on the Stats page." },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "50%" } },
        { name: "value", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    { name: "link", type: "text", validate: url },
  ],
});

export const WorkCategories = contentCollection({
  slug: "work-categories",
  labels: { singular: "Work category", plural: "Work categories" },
  admin: { group: "Portfolio", useAsTitle: "name", description: "Filter tabs on the Works page (“All” is added automatically)." },
  fields: [{ name: "name", type: "text", required: true, unique: true }],
});

export const Works = contentCollection({
  slug: "works",
  labels: { singular: "Work", plural: "Works" },
  admin: { group: "Portfolio", useAsTitle: "title", defaultColumns: ["title", "client", "date", "categories"] },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
      minRows: 1,
      admin: { description: "The first image is the thumbnail and the header in the details popup." },
    },
    { name: "categories", type: "relationship", relationTo: "work-categories", hasMany: true },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { rows: 12, description: "Supports Markdown: **bold**, lists, links." },
    },
    {
      type: "row",
      fields: [
        { name: "client", type: "text", admin: { width: "33%" } },
        { name: "owner", type: "text", admin: { width: "33%" } },
        { name: "date", type: "date", admin: { width: "33%", date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "projectUrl", label: "Project URL", type: "text", validate: url, admin: { width: "50%" } },
        { name: "githubUrl", label: "GitHub URL", type: "text", validate: url, admin: { width: "50%" } },
      ],
    },
    { name: "techStack", type: "array", fields: [{ name: "name", type: "text", required: true }] },
    {
      name: "highlights",
      type: "array",
      admin: { description: "Bullet list at the bottom of the details popup." },
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
});
