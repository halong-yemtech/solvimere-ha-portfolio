"use client";

import MyInfo from "../MyInfo";
import { useSite } from "../SiteProvider";

const linkClass = "hover:text-main-orange transition-colors duration-200";

export default function Location() {
  const { profile } = useSite();

  return (
    <div className="p-12">
      {profile.mapEmbedUrl && (
        <iframe
          src={profile.mapEmbedUrl}
          title="Location map"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96"
        />
      )}
      <ul className="location grid grid-cols-1 sm:grid-cols-2 mt-10 gap-y-2">
        {profile.address && <MyInfo field="address" value={profile.address} />}
        {profile.email && (
          <MyInfo
            field="email"
            value={
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
            }
          />
        )}
        {profile.phone && (
          <MyInfo
            field="phone"
            value={
              profile.phoneLink ? (
                <a href={profile.phoneLink} target="_blank" rel="noreferrer" className={linkClass}>
                  {profile.phone}
                </a>
              ) : (
                profile.phone
              )
            }
          />
        )}
        {profile.status && <MyInfo field="status" value={profile.status} />}
      </ul>
    </div>
  );
}
