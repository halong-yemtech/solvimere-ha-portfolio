import Title from "../Title";
import { upworkProfileUrl } from "@/data/profile";
import Link from "next/link";

export default function DevBlogs() {
  return (
    <section className="h-full overflow-y-scroll myScroll">
      <Title name="blogs" />
      <div className="px-12 py-16 text-center">
        <p className="text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Technical articles and write-ups are available on my Upwork profile.
          Connect with me to discuss backend architecture, Go microservices, and
          cloud infrastructure projects.
        </p>
        <Link
          href={upworkProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-8 text-xl uppercase font-semibold text-gray-300 border-2 border-gray-300 rounded-full px-8 py-3 hover:text-main-orange hover:border-main-orange transition-all duration-200"
        >
          view upwork profile
        </Link>
      </div>
    </section>
  );
}
