"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SkillBar from "./skill-bar"

const skillCategories = [
  {
    title: "Languages",
    gradient: "from-[#00c6ff] to-[#0072ff]",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 70 },
      { name: "C", level: 65 },
    ],
  },
  {
    title: "Libraries",
    gradient: "from-[#fc466b] to-[#3f5efb]",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "Scikit-learn", level: 85 },
      { name: "Seaborn", level: 80 },
      { name: "Matplotlib", level: 85 },
    ],
  },
  {
    title: "BI Tools",
    gradient: "from-[#f7971e] to-[#ffd200]",
    skills: [
      { name: "Power BI", level: 90 },
      { name: "Excel", level: 95 },
    ],
  },
  {
    title: "Web",
    gradient: "from-[#00f2fe] to-[#4facfe]",
    skills: [
      { name: "Flask", level: 75 },
      { name: "Streamlit", level: 85 },
      { name: "HTML", level: 70 },
      { name: "CSS", level: 65 },
    ],
  },
  {
    title: "Databases",
    gradient: "from-[#43e97b] to-[#38f9d7]",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    title: "Machine Learning",
    gradient: "from-[#8e2de2] to-[#4a00e0]",
    skills: [
      { name: "Deep Learning", level: 85 },
      { name: "NLP", level: 80 },
      { name: "Computer Vision", level: 75 },
    ],
  },
]

export default function Skills() {
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
        My <span className="text-mint-green">Skills</span>
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12"></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg"
          >
            <h3
              className={`text-xl font-semibold mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
            >
              {category.title}
            </h3>
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.2}
                  gradient={category.gradient}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
