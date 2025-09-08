"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rect from "./rect";

const Rects = ({ rects, speed }) => {
  let margin = 5;
  if (rects.length > 50) {
    margin = 1;
  }

  return (
    <div className="flex justify-center items-end">
      <AnimatePresence>
        {rects.map((rect, rectidx) => (
          <motion.div
            key={rectidx} // use unique id if possible: rect.id
            layout // enables automatic smooth position transitions
            initial={{ opacity: 0, y: 20 }} // fade in
            animate={{ opacity: 1, y: 0 }}  // animate to final position
            exit={{ opacity: 0, y: 20 }}    // animate out if removed
            transition={{ duration: speed / 1000, ease: "easeInOut" }}
            className="mx-1" // small horizontal spacing
          >
            <Rect marg={margin} rect={rect} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Rects;
