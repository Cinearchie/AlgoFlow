"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rect from "./rect";

const Rects = ({ rects, speed }) => {
  let margin = rects.length > 50 ? 1 : 5;

  // ✅ Ensure duration is always positive (between 0.05s and 2s)
  const duration = Math.max(0.05, (speed || 500) / 1000);
  
  return (
    <div className="flex justify-center items-end w-full h-[400px] mt-6">
      <AnimatePresence>
        {rects.map((rect, rectidx) => (
          <motion.div
            key={rectidx} // better: use rect.kk or unique id
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration, ease: "easeInOut" }} // ✅ clamped duration
            className="mx-1"
          >
            <Rect marg={margin} rect={rect} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Rects;
