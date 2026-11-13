import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { getSiteData } from "@/lib/site";
import { SiteProvider } from "@/components/SiteProvider";
import HomePage from "./components/HomePage";

// Content is edited live in the CMS (/admin), so render on each request.
export const dynamic = "force-dynamic";

export default async function Home() {
  const site = await getSiteData();

  if (!site) {
    return (
      <main className="flex items-center justify-center min-h-screen p-10 text-center bg-gray-900">
        <div className="max-w-2xl space-y-6 text-2xl text-gray-300">
          <h1 className="text-4xl font-semibold text-main-orange">No content yet</h1>
          <p>
            The database is empty. Load the starter content with{" "}
            <code className="text-main-orange">bun run seed</code>, or fill in{" "}
            <strong>Profile &amp; Site</strong> in the CMS.
          </p>
          <Link href="/admin" className="inline-block underline hover:text-main-orange">
            Open the CMS →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <SiteProvider data={site}>
      <HomePage />
    </SiteProvider>
  );
}
