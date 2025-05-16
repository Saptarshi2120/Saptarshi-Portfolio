"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
}

export default function CountUp({ end, duration = 2, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const countRef = useRef(0)
  const multiplier = 10 ** decimals

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const nextCount = Math.floor(progress * end * multiplier) / multiplier
      setCount(nextCount)
      countRef.current = nextCount

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView, multiplier])

  return <span ref={ref}>{count.toFixed(decimals)}</span>
}
