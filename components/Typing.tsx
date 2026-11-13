"use client";

import Typewriter from "typewriter-effect";
import { profile } from "@/data/profile";

export default function Typing() {
  const [firstTitle, secondTitle] = profile.typingTitles;

  return (
    <div className="text-center h-8">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(
              `<span style="color: #f59e0b; font-size: 14px; font-weight: 400;">${firstTitle}</span>`
            )
            .pauseFor(3500)
            .deleteAll(17)
            .typeString(
              `<span style="color: #f59e0b; font-size: 14px; font-weight: 400;">${secondTitle}</span>`
            )
            .pauseFor(3500)
            .deleteAll(17)
            .start();
        }}
        options={{
          autoStart: true,
          loop: true,
          cursor: "",
          delay: 17,
        }}
      />
    </div>
  );
}
