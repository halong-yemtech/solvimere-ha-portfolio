import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import type { SiteData, SiteImage, TestimonialData } from "./siteTypes";

export const getPayloadClient = () => getPayload({ config });

function image(value: number | Media | null | undefined): SiteImage | null {
  if (!value || typeof value !== "object" || !value.url) return null;
  return { url: value.url, alt: value.alt || "" };
}

function images(values: (number | Media)[] | null | undefined): SiteImage[] {
  return (values ?? []).map(image).filter((i): i is SiteImage => i !== null);
}

const str = (v: string | null | undefined) => v ?? "";

/**
 * Everything the public site renders, read from the CMS in one go.
 * Returns null until the Profile global has been filled in (fresh database).
 */
export const getSiteData = cache(async (): Promise<SiteData | null> => {
  const payload = await getPayloadClient();

  const list = <S extends Parameters<typeof payload.find>[0]["collection"]>(collection: S) =>
    payload.find({ collection, sort: "_order", limit: 200, depth: 1, pagination: false });

  const [
    profile,
    skills,
    socialLinks,
    services,
    pricingPlans,
    clients,
    testimonials,
    facts,
    statistics,
    resume,
    workCategories,
    works,
  ] = await Promise.all([
    payload.findGlobal({ slug: "profile", depth: 1 }),
    payload.findGlobal({ slug: "skills", depth: 0 }),
    list("social-links"),
    list("services"),
    list("pricing-plans"),
    list("clients"),
    list("testimonials"),
    list("facts"),
    list("statistics"),
    list("resume-entries"),
    list("work-categories"),
    list("works"),
  ]);

  if (!profile?.name) return null;

  const avatar = image(profile.avatar);

  const quote: TestimonialData | null = profile.quote?.text
    ? {
        id: "quote",
        quote: profile.quote.text,
        name: profile.quote.author || profile.name,
        role: profile.quote.role || profile.jobTitle,
        photo: image(profile.quote.image) ?? avatar,
      }
    : null;

  return {
    profile: {
      name: profile.name,
      jobTitle: profile.jobTitle,
      typingTitles: (profile.typingTitles ?? []).map((t) => t.title),
      avatar,
      backgroundImages: images(profile.backgroundImages),
      cvUrl: image(profile.cv)?.url ?? null,
      hireLink: profile.hireLinkUrl
        ? {
            label: profile.hireLinkLabel || "hire me",
            url: profile.hireLinkUrl,
            icon: profile.hireLinkIcon || "FaLink",
          }
        : null,
      copyright: str(profile.copyright),
      bio: profile.bio,
      age: str(profile.age),
      residence: str(profile.residence),
      status: str(profile.status),
      address: str(profile.address),
      email: str(profile.email),
      phone: str(profile.phone),
      phoneLink: profile.phoneLink || null,
      mapEmbedUrl: profile.mapEmbedUrl || null,
      quote,
      blog: {
        intro: str(profile.blog?.intro),
        buttonLabel: profile.blog?.buttonLabel || "view profile",
        buttonUrl: profile.blog?.buttonUrl || null,
      },
      metaDescription: str(profile.metaDescription),
    },
    socialLinks: socialLinks.docs.map((d) => ({
      id: d.id,
      label: d.label,
      url: d.url,
      icon: d.icon,
      color: d.color || "#ffffff",
      info: str(d.info),
    })),
    services: services.docs.map((d) => ({
      id: d.id,
      title: d.title,
      icon: d.icon,
      description: d.description,
    })),
    pricingPlans: pricingPlans.docs.map((d) => ({
      id: d.id,
      name: d.name,
      icon: d.icon,
      price: d.price,
      period: str(d.period),
      orderUrl: d.orderUrl,
      features: (d.features ?? []).map((f, i) => ({
        id: f.id ?? String(i),
        feature: f.feature,
        included: Boolean(f.included),
      })),
    })),
    clients: clients.docs.map((d) => ({
      id: d.id,
      name: d.name,
      url: d.url,
      icon: d.icon ?? null,
      logo: image(d.logo),
    })),
    testimonials: testimonials.docs.map((d) => ({
      id: d.id,
      quote: d.quote,
      name: d.name,
      role: str(d.role),
      photo: image(d.photo) ?? avatar,
    })),
    facts: facts.docs.map((d) => ({ id: d.id, icon: d.icon, description: d.description })),
    statistics: statistics.docs.map((d) => ({
      id: d.id,
      title: d.title,
      value: d.value,
      link: d.link || null,
    })),
    resume: resume.docs.map((d) => ({
      id: d.id,
      type: d.type,
      period: d.period,
      title: d.title,
      subtitle: str(d.subtitle),
      description: str(d.description),
    })),
    skills: {
      coding: (skills.coding ?? []).map((s, i) => ({
        id: s.id ?? String(i),
        name: s.name,
        percent: s.percent,
      })),
      knowledge: (skills.knowledge ?? []).map((k) => k.item),
      development: (skills.development ?? []).map((s, i) => ({
        id: s.id ?? String(i),
        name: s.name,
        percent: s.percent,
      })),
      languages: (skills.languages ?? []).map((l, i) => ({
        id: l.id ?? String(i),
        name: l.name,
        level: l.level,
      })),
    },
    workCategories: workCategories.docs.map((d) => d.name),
    works: works.docs.map((d) => ({
      id: d.id,
      title: d.title,
      images: images(d.images),
      categories: (d.categories ?? [])
        .map((c) => (typeof c === "object" ? c.name : null))
        .filter((c): c is string => Boolean(c)),
      description: d.description,
      client: str(d.client),
      owner: str(d.owner),
      date: d.date || null,
      projectUrl: d.projectUrl || null,
      githubUrl: d.githubUrl || null,
      techStack: (d.techStack ?? []).map((t) => t.name),
      highlights: (d.highlights ?? []).map((h) => h.item),
    })),
  };
});
