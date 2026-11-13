/**
 * Loads the starter content (seed/profile.ts, seed/works.ts, seed/assets/*)
 * into the CMS database.
 *
 *   bun run seed              # only runs on an empty database
 *   SEED_FORCE=1 bun run seed # wipes site content + media first, then re-seeds
 *
 * Admin users and inbox messages are never touched. Create your admin user by
 * opening /admin after seeding.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload, type CollectionSlug } from "payload";
import config from "../payload.config";
import {
  bio,
  clients,
  facts,
  prices,
  profile,
  quoteData,
  resumeEducation,
  resumeExperience,
  services,
  skills,
  socialMedia,
  statistics,
  testimonials,
  upworkProfileUrl,
  whatsappUrl,
} from "./profile";
import { workDetails, works, workTabs } from "./works";
import type { IconName } from "@/lib/iconNames";

const assetsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "assets");

const CONTENT_COLLECTIONS: CollectionSlug[] = [
  "works",
  "work-categories",
  "social-links",
  "services",
  "pricing-plans",
  "clients",
  "testimonials",
  "facts",
  "statistics",
  "resume-entries",
  "media",
];

const payload = await getPayload({ config });

const existing = await payload.findGlobal({ slug: "profile", depth: 0 });
if (existing?.name && !process.env.SEED_FORCE) {
  payload.logger.info(
    "The database already has content — nothing to do. Run with SEED_FORCE=1 to wipe site content and re-seed."
  );
  process.exit(0);
}

if (process.env.SEED_FORCE) {
  for (const collection of CONTENT_COLLECTIONS) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
  payload.logger.info("Cleared existing site content and media.");
}

// ── Media ─────────────────────────────────────────────────────
// Seed data refers to files by their old public URL (e.g. "/images/avatar.jpg");
// they now live under seed/assets with the same relative path.
const mediaIds = new Map<string, number>();

async function media(publicUrl: string, alt: string): Promise<number> {
  const cached = mediaIds.get(publicUrl);
  if (cached) return cached;
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(assetsDir, publicUrl),
  });
  mediaIds.set(publicUrl, doc.id);
  return doc.id;
}

const avatar = await media(profile.avatar, profile.name);
const backgrounds = await Promise.all(
  ["/images/b-1.jpg", "/images/b-2.jpg", "/images/b-3.jpg"].map((u, i) =>
    media(u, `Background ${i + 1}`)
  )
);
const cv = await media(profile.cv, `${profile.name} — CV`);

// ── Globals ──────────────────────────────────────────────────
await payload.updateGlobal({
  slug: "profile",
  data: {
    name: profile.name,
    jobTitle: profile.title,
    typingTitles: profile.typingTitles.map((title) => ({ title })),
    avatar,
    backgroundImages: backgrounds,
    cv,
    hireLinkLabel: "my upwork",
    hireLinkUrl: upworkProfileUrl,
    hireLinkIcon: "SiUpwork",
    copyright: profile.copyright,
    bio,
    age: profile.age,
    residence: profile.residence,
    status: profile.status,
    hourlyRate: profile.hourlyRate,
    address: profile.address,
    email: profile.email,
    phone: profile.phone,
    phoneLink: whatsappUrl,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875397.294776923!2d-122.848974!3d45.515232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7c0ed108%3A0x1f6cc682eda68499!2sPortland%2C%20OR%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    quote: {
      text: quoteData.quote,
      author: quoteData.userName,
      role: quoteData.userProfession,
    },
    blog: {
      intro:
        "Technical articles and write-ups are available on my Upwork profile. Connect with me to discuss backend architecture, Go microservices, and cloud infrastructure projects.",
      buttonLabel: "view upwork profile",
      buttonUrl: upworkProfileUrl,
    },
    metaDescription:
      "Senior GoLang Developer and Backend Architect with 10+ years of experience delivering robust, scalable, cloud-native solutions.",
  },
});

await payload.updateGlobal({
  slug: "skills",
  data: {
    coding: skills.coding.map((s) => ({ name: s.field, percent: Number(s.value) })),
    knowledge: skills.knowledge.map((item) => ({ item })),
    development: skills.development.map((s) => ({ name: s.field, percent: Number(s.value) })),
    languages: skills.languages.map((s) => ({ name: s.field, level: Number(s.value) })),
  },
});

// ── Collections (created in display order) ────────────────────
for (const s of socialMedia) {
  await payload.create({
    collection: "social-links",
    data: { label: s.label, url: s.mediaUrl, icon: s.icon as IconName, color: s.logoColor.hex, info: s.info },
  });
}

for (const s of services) {
  await payload.create({
    collection: "services",
    data: { title: s.title, icon: s.icon as IconName, description: s.description },
  });
}

const planIcons: IconName[] = ["DiCodeigniter", "GiCondorEmblem"];
for (const [i, p] of prices.entries()) {
  await payload.create({
    collection: "pricing-plans",
    data: {
      name: p.packageName,
      icon: planIcons[i % planIcons.length],
      price: p.packagePrice,
      period: p.priceType,
      orderUrl: p.freelanceUrl,
      features: p.packageServices.map((f) => ({ feature: f.packageService, included: f.isIncluded })),
    },
  });
}

const clientNames: Record<string, string> = {
  FaLinkedin: "LinkedIn",
  FaIdCard: "ZoomInfo",
  SiUpwork: "Upwork",
  FaGithub: "GitHub",
};
for (const c of clients) {
  await payload.create({
    collection: "clients",
    data: { name: clientNames[c.icon] ?? c.icon, url: c.link, icon: c.icon as IconName },
  });
}

for (const t of testimonials) {
  await payload.create({
    collection: "testimonials",
    data: { quote: t.quote, name: t.userName, role: t.userProfession, photo: avatar },
  });
}

for (const f of facts) {
  await payload.create({
    collection: "facts",
    data: { icon: f.icon as IconName, description: f.description },
  });
}

for (const s of statistics) {
  await payload.create({
    collection: "statistics",
    data: { title: s.title, value: s.info, link: "externalLink" in s ? s.externalLink : undefined },
  });
}

for (const r of [...resumeExperience, ...resumeEducation]) {
  await payload.create({
    collection: "resume-entries",
    data: {
      type: r.isExperience ? "experience" : "education",
      period: r.badge,
      title: r.title,
      subtitle: r.subTitle,
      description: r.description,
    },
  });
}

const categoryIds = new Map<string, number>();
for (const name of workTabs.filter((t) => t !== "All")) {
  const doc = await payload.create({ collection: "work-categories", data: { name } });
  categoryIds.set(name, doc.id);
}

for (const w of works) {
  const d = workDetails[w.id as keyof typeof workDetails];
  const images: number[] = [];
  for (const [i, img] of d.images.entries()) {
    images.push(await media(img.url, `${d.title} — screenshot ${i + 1}`));
  }
  await payload.create({
    collection: "works",
    data: {
      title: d.title,
      images,
      categories: w.workTabs
        .map((t) => categoryIds.get(t.tab))
        .filter((id): id is number => id !== undefined),
      description: d.description,
      client: d.clientName,
      owner: d.ownerName,
      date: d.date.toISOString(),
      projectUrl: d.workUrl,
      githubUrl: d.githubUrl,
      techStack: d.techStack.map((name) => ({ name })),
      highlights: d.userActions.map((item) => ({ item })),
    },
  });
}

payload.logger.info(
  `Seed complete: ${mediaIds.size} media files, ${works.length} works. Open /admin to create your admin user.`
);
process.exit(0);
