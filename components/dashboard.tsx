"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

const performanceData = [
  { name: "Drowsiness Detection", value: 95 },
  { name: "Bengali Caption Generator", value: 85 },
  { name: "Bird Sound Classifier", value: 98.41 },
  { name: "Fraud Detection", value: 92 },
  { name: "EV Segmentation", value: 88 },
]

const lineData = [
  { name: "Jan", accuracy: 85 },
  { name: "Feb", accuracy: 88 },
  { name: "Mar", accuracy: 90 },
  { name: "Apr", accuracy: 93 },
  { name: "May", accuracy: 95 },
  { name: "Jun", accuracy: 98.41 },
]

const pieData = [
  { name: "Python", value: 40 },
  { name: "SQL", value: 20 },
  { name: "ML Models", value: 25 },
  { name: "Visualization", value: 15 },
]

const BAR_COLORS = ["#00ffcc", "#9933ff", "#39ff14", "#ff6ec7", "#00bfff"]
const PIE_COLORS = ["#6366f1", "#4ade80", "#f97316", "#8b5cf6"]
const LINE_COLORS = ["#00ffcc", "#9933ff", "#39ff14", "#ff6ec7", "#00bfff", "#ffcc00"]

export default function Dashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
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
      {/* Header */}
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-center">
        AI <span className="text-mint-green">Performance</span> Dashboard
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          variants={chartVariants}
          className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Project Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  height={70}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "Score (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f3f4f6",
                  }}
                />
                <Bar dataKey="value" animationDuration={1500}>
                  {performanceData.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={chartVariants}
          className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Project Tech Stack Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f3f4f6",
                  }}
                  formatter={(value) => [`${value}%`, "Usage"]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span style={{ color: "#9ca3af" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          variants={chartVariants}
          className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Model Accuracy Improvement Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                <YAxis
                  domain={[80, 100]}
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "Accuracy (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f3f4f6",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={() => <span style={{ color: "#9ca3af" }}>Model Accuracy</span>}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={({ cx, cy, index }) => (
                    <circle cx={cx} cy={cy} r={6} stroke="black" strokeWidth={1} fill={LINE_COLORS[index % LINE_COLORS.length]} />
                  )}
                  activeDot={({ cx, cy, index }) => (
                    <circle cx={cx} cy={cy} r={8} fill={LINE_COLORS[index % LINE_COLORS.length]} stroke="white" strokeWidth={2} />
                  )}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
