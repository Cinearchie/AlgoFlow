"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SortingAnimation() {
  const [bars, setBars] = useState([])

  // helper → randomize
  const randomArray = () =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 20)

  useEffect(() => {
    let arr = randomArray()
    setBars(arr)

    let sorted = false

    const interval = setInterval(() => {
      if (sorted) {
        // shuffle again
        arr = randomArray()
        setBars(arr)
      } else {
        // sort
        setBars([...arr].sort((a, b) => a - b))
      }
      sorted = !sorted
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-96 flex items-end justify-center overflow-visible px-4">
    <div className="flex items-end gap-3 -translate-x-18">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          layout
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="bg-blue-500 rounded-t-md"
          style={{ width: "25px", height: `${h}px` }}
        />
      ))}
    </div>
  </div>
  

  )
}
