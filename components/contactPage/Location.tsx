import MyInfo from "../MyInfo";
import { profile, whatsappUrl } from "@/data/profile";

export default function Location() {
  return (
    <div className="p-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875397.294776923!2d-122.848974!3d45.515232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7c0ed108%3A0x1f6cc682eda68499!2sPortland%2C%20OR%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
        style={{ border: 0 } as React.CSSProperties}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-96"
      />
      <ul className="location grid grid-cols-1 sm:grid-cols-2 mt-10 gap-y-2">
        <MyInfo field="address" value={profile.address} />
        <MyInfo
          field="email"
          value={
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-main-orange transition-colors duration-200"
            >
              {profile.email}
            </a>
          }
        />
        <MyInfo
          field="phone"
          value={
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-main-orange transition-colors duration-200"
            >
              {profile.phone}
            </a>
          }
        />
        <MyInfo field="status" value={profile.status} />
      </ul>
    </div>
  );
}
