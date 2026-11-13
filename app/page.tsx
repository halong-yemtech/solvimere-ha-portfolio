import type { NextPage } from "next";
import "react-loading-skeleton/dist/skeleton.css";
import { ProfileData } from "@/types";
import { profile, socialMedia, cvUrl } from "@/data/profile";
import HomePage from "./components/HomePage";

const localBgImages = ["/images/b-1.jpg", "/images/b-2.jpg", "/images/b-3.jpg"].map(
  (url) => ({ url })
);

const localProfileData: ProfileData = {
  id: "local",
  name: profile.name,
  ownersPhoto: { url: profile.avatar },
  bgImages: localBgImages,
  socialMedia,
  cv: cvUrl,
};

const getProfileData = async (): Promise<ProfileData> => {
  const hygraphUrl = process.env.NEXT_PUBLIC_HYGRAPH_URL;
  if (!hygraphUrl) return localProfileData;

  try {
    const response = await fetch(hygraphUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query GetProfile {
            profiles {
              bio
              cv
              id
              name
              ownersPhoto {
                url
              }
              bgImages {
                url
              }
              socialMedia {
                id
                icon
                label
                mediaUrl
                logoColor {
                  hex
                }
                info
              }
            }
          }
        `,
      }),
      next: { revalidate: 600 },
    });

    const { data } = await response.json();
    const remote = data?.profiles?.[0];
    if (!remote) return localProfileData;

    return {
      ...localProfileData,
      id: remote.id,
      bgImages: remote.bgImages?.length ? remote.bgImages : localBgImages,
    };
  } catch (error) {
    console.error("Hygraph profile fetch failed, using local data:", error);
    return localProfileData;
  }
};

const Home: NextPage = async () => {
  const profileData = await getProfileData();

  return <HomePage profileData={profileData} />;
};

export default Home;
