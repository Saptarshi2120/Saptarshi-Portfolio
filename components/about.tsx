"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { User, MapPin, Mail, Phone, Github, Linkedin } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="max-w-5xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-center">
        About <span className="text-mint-green">Me</span>
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12"></motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold mb-4">Data Analyst & ML Enthusiast</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            I'm a data enthusiast who believes that insights are not just numbers—they're the pulse of every innovation.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            My journey began with curiosity and transformed into a mission: to become a data scientist who builds
            intelligent systems that leave real impact. Whether it's classifying bird calls, detecting fraud, or
            crafting Bengali captions through AI, I thrive on solving problems that matter.
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            With a blend of machine learning, deep learning, and analytical intuition, I bridge the gap between raw data
            and real decisions. My strength lies not just in building models—but in asking the right questions.
          </p>

          {/* ✅ Updated spacing here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-8">
            <div className="flex items-center">
              <User className="w-5 h-5 text-mint-green mr-3" />
              <span>Saptarshi Dey</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-mint-green mr-3" />
              <span>Salt Lake, Kolkata</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-mint-green mr-3" />
              <span>dsaptarshi581@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-mint-green mr-3" />
              <span>(+91) 8116850597</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/Saptarshi2120"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-mint-green hover:text-slate-900 transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/saptarshi2120"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-mint-green hover:text-slate-900 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold mb-6">Education</h3>
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-1">Techno Main Salt Lake</h4>
              <p className="text-mint-green mb-2">B.Tech in Computer Science (Data Science)</p>
              <p className="text-gray-400 mb-1">August 2021 - Present</p>
              <p className="text-gray-300">CGPA: 8.94</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-1">St. Paul's Academy</h4>
              <p className="text-mint-green mb-2">Higher Secondary (Physics, Chemistry, Mathematics)</p>
              <p className="text-gray-400 mb-1">March 2019 - February 2021</p>
              <p className="text-gray-300">Percentage: 87%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
