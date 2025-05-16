"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AICardProps {
  children: React.ReactNode
  className?: string
}

export const AICard: React.FC<AICardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface AISectionHeadingProps {
  children: React.ReactNode
  subtext?: string
}

export const AISectionHeading: React.FC<AISectionHeadingProps> = ({ children, subtext }) => {
  return (
    <div className="mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-2"
      >
        <span className="text-mint-green">{children}</span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-20 h-1 bg-mint-green mx-auto mb-4"
      ></motion.div>
      {subtext && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          {subtext}
        </motion.p>
      )}
    </div>
  )
}
