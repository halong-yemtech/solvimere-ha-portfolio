import type { ResumeEntryData } from "@/lib/siteTypes";

interface Props {
  resume: ResumeEntryData;
  border?: boolean;
}

export default function ResumeItem({ resume, border }: Props) {
  return (
    <div
      className={`pt-11 ${
        border ? "customLine before:bottom-0 relative borderLeft pb-11" : "pb-3"
      }`}
    >
      <h2
        className={`${
          /present$/i.test(resume.period.trim())
            ? "text-main-orange border-main-orange"
            : "text-gray-500 border-gray-500"
        } border border-solid text-xl py-0.5 px-3 tracking-wide inline-block`}
      >
        {resume.period}
      </h2>
      <h3 className="text-2xl capitalize font-medium text-gray-300 tracking-wide mt-5 mb-4">
        {resume.title}
      </h3>

      {resume.subtitle && (
        <p className="text-gray-500 text-xl capitalize tracking-wider">{resume.subtitle}</p>
      )}
      {resume.description && (
        <p className="text-gray-500 text-2xl capitalize tracking-wide mt-5 leading-relaxed">
          {resume.description}
        </p>
      )}
    </div>
  );
}
