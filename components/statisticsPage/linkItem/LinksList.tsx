import LinkItem from "./LinkItem";
import { socialMedia } from "@/data/profile";

export default function LinksList() {
  return (
    <ul className="px-12 py-8 mb-8 space-y-6">
      {socialMedia.map((sm) => (
        <LinkItem key={sm.id} socialMedia={sm} />
      ))}
    </ul>
  );
}
