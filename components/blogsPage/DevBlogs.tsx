"use client";

import Link from "next/link";
import Title from "../Title";
import { useSite } from "../SiteProvider";

export default function DevBlogs() {
  const { blog } = useSite().profile;

  return (
    <section className="h-full overflow-y-scroll myScroll">
      <Title name="blogs" />
      <div className="px-12 py-16 text-center">
        {blog.intro && (
          <p className="text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">{blog.intro}</p>
        )}
        {blog.buttonUrl && (
          <Link
            href={blog.buttonUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-xl uppercase font-semibold text-gray-300 border-2 border-gray-300 rounded-full px-8 py-3 hover:text-main-orange hover:border-main-orange transition-all duration-200"
          >
            {blog.buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
