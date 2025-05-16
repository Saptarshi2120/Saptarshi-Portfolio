"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import CountUp from "@/components/count-up"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 lg:order-1">
          <motion.h2 variants={itemVariants} className="text-mint-green font-medium mb-2">
            Hi, I&apos;m
          </motion.h2>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-mint-green"
          >
            Saptarshi Dey
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-6">
            I turn data into meaningful, actionable stories.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-lg">
            A Data Analyst passionate about solving real-world problems with data science, machine learning, and
            visualization.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-mint-green text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 inline-block"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-mint-green/30 shadow-xl shadow-mint-green/20">
            <Image src="/images/profile_photo.png" alt="Saptarshi Dey" fill className="object-cover" priority />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-mint-green mb-2">
            <CountUp end={8} duration={2} />
          </h3>
          <p className="text-gray-300">Projects</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-mint-green mb-2">
            <CountUp end={3} duration={2} />
          </h3>
          <p className="text-gray-300">Internships</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-mint-green mb-2">
            <CountUp end={1} duration={2} />
          </h3>
          <p className="text-gray-300">Research Paper</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-mint-green mb-2">
            <CountUp end={4} duration={2} />
          </h3>
          <p className="text-gray-300">Certifications</p>
        </div>
      </motion.div>
    </div>
  )
}
