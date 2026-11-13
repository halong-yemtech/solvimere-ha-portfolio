import MyInfo from "../../MyInfo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { bio, profile } from "@/data/profile";

export default function AboutMe() {
  return (
    <div className="px-12 py-10">
      <article className="prose max-w-none prose-h2:mb-2.5 prose-h2:text-[1.6rem] prose-p:text-2xl prose-p:leading-[1.65] prose-strong:text-main-orange prose-strong:font-semibold">
        <ReactMarkdown children={bio} remarkPlugins={[remarkGfm]} />
      </article>

      <ul className="location grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-2">
        <MyInfo field="age" value={profile.age} />
        <MyInfo field="residence" value={profile.residence} />
        <MyInfo field="status" value={profile.status} />
        <MyInfo field="address" value={profile.address} />
      </ul>
    </div>
  );
}
