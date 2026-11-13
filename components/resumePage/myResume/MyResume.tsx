import IconTitle from "../IconTitle";
import ResumeItem from "./ResumeItem";
import { FaGraduationCap, FaNetworkWired } from "react-icons/fa";
import { resumeEducation, resumeExperience } from "@/data/profile";

export default function MyResume() {
  return (
    <ul className="grid sm:grid-cols-2 grid-cols-1">
      <li className="py-8 px-12">
        <IconTitle title="experience" Icon={FaNetworkWired} />
        {resumeExperience.map((r, idx) => (
          <ResumeItem
            key={r.id}
            resume={r}
            border={idx !== resumeExperience.length - 1}
          />
        ))}
      </li>

      <li className="py-8 px-12 relative vCustomLine sm:before:block before:hidden before:left-0">
        <IconTitle title="education" Icon={FaGraduationCap} />
        {resumeEducation.map((r, idx) => (
          <ResumeItem
            key={r.id}
            resume={r}
            border={idx !== resumeEducation.length - 1}
          />
        ))}
      </li>
    </ul>
  );
}
