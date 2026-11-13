"use client";

import { useMemo } from "react";
import { useReactiveVar } from "@apollo/client/react";
import Title from "../Title";
import Work from "./Work";
import { currentWorkTab } from "@/lib/apollo/apolloClient";
import { motion, AnimatePresence } from "framer-motion";
import { works } from "@/data/works";

export default function Works() {
  const currentTab = useReactiveVar(currentWorkTab);

  const filteredWorks = useMemo(() => {
    if (currentTab === "All") return works;
    return works.filter((w) => w.workTabs.some((t) => t.tab === currentTab));
  }, [currentTab]);

  return (
    <div
      id="scrollableDiv"
      className="lg:h-full h-[95rem] overflow-y-scroll myScroll"
    >
      <Title name="works" currentMenu={currentTab} />

      <motion.ul className="grid grid-cols-1 sm:grid-cols-2 relative vCustomLine before:hidden sm:before:block before:left-1/2 before:-translate-x-1/2 pt-12">
        <AnimatePresence>
          {filteredWorks.map((w, idx) => (
            <Work
              key={w.id}
              title={w.title}
              imageUrl={w.images[0].url}
              projectId={w.id}
              priority={idx === 0}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
