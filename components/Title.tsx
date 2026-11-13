"use client";

import { workTabs } from "@/data/works";
import { currentWorkTab } from "@/lib/apollo/apolloClient";
import { useEffect } from "react";

interface Props {
  name: string;
  currentMenu?: string;
}

export default function Title({ name, currentMenu }: Props) {
  useEffect(() => {
    if (currentMenu === undefined) return;
    if (!currentWorkTab()) {
      currentWorkTab(workTabs[0]);
    }
  }, [currentMenu]);

  return (
    <div className="customLine relative before:bottom-0 borderLeft z-20 py-10 flex flex-wrap gap-8 justify-center sm:justify-between items-center">
      <span className="ml-12 customCircle relative tracking-wide capitalize text-3xl text-gray-300 font-medium">
        {name}
      </span>

      {currentMenu && (
        <ul className="flex flex-wrap items-center gap-6 mr-12 ml-12">
          {workTabs.map((tab) => (
            <li
              key={tab}
              onClick={() => currentWorkTab(tab)}
              className={`text-[1.4rem] cursor-pointer tracking-wide ${
                currentMenu === tab ? "text-main-orange" : "text-gray-300"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
