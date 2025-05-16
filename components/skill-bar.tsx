"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

interface SkillBarProps {
  name: string
  level: number
  delay?: number
  gradient?: string
}

export default function SkillBar({
  name,
  level,
  delay = 0,
  gradient = "from-indigo-600 to-mint-green",
}: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(level)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, level, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-300">{name}</span>
        <span className="text-mint-green">{level}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, delay: delay }}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
        ></motion.div>
      </div>
    </div>
  )
}
