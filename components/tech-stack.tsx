"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗃️" },
  { name: "Pandas", icon: "🐼" },
  { name: "Power BI", icon: "📊" },
  { name: "Scikit-learn", icon: "🤖" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "Flask", icon: "🌶️" },
  { name: "Streamlit", icon: "📱" },
  { name: "NumPy", icon: "🔢" },
  { name: "Matplotlib", icon: "📈" },
  { name: "Seaborn", icon: "📉" },
  { name: "MongoDB", icon: "🍃" },
]

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg flex items-center hover:bg-slate-700/50 transition-colors duration-300"
        >
          <span className="text-2xl mr-3">{tech.icon}</span>
          <span>{tech.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
