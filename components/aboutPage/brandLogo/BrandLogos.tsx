import Link from "next/link";
import MyIcon from "../../MyIcon";
import { clients } from "@/data/profile";

export default function BrandLogos() {
  return (
    <ul className="logos grid sm:grid-cols-4 grid-cols-2">
      {clients.map((client, idx) => (
        <li key={client.id}>
          <div
            className={`py-16 px-12 relative vCustomLine before:right-0 ${
              idx !== clients.length - 1
                ? `${idx === 1 ? "before:hidden sm:before:block" : "before:block"}`
                : "before:hidden"
            }`}
          >
            <Link
              href={client.link}
              rel="noreferrer"
              target="_blank"
              className="inline-flex w-full h-12 items-center justify-center opacity-50 transition-all duration-300 hover:opacity-100"
            >
              <MyIcon
                Icon={client.icon}
                size="w-12 h-12"
                wrapperClassName=""
                iconClassName="text-5xl text-gray-300"
              />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
