"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import ProjectCard from "./project-card"
import { ChevronDown, ChevronUp } from "lucide-react"

const projects = [
{
    title: "Endangered Bird Sound Classification",
    description: "Achieved ~98.41% accuracy across 25–50 species using deep learning.",
    image: "/images/endangered bird species prediction.png",
    tags: ["VGG-16", "Audio Processing"],
    github: "https://github.com/Saptarshi2120/Bird-Song-Predictor",
    demo: "https://bird-species-predictor.streamlit.app",
  },
  {
    title: "Driver Drowsiness Detection",
    description: "Real-time fatigue detection using facial recognition and alerts.",
    image: "/images/driver drowsiness detection.png",
    tags: ["TensorFlow", "OpenCV"],
    github: "https://github.com/Saptarshi2120/Drivers-Drowsiness-Detection",
    demo: null,
  },
  {
    title: "Bengali Caption Generator",
    description: "Generated Bengali image captions with deep learning and 85% BLEU score.",
    image: "/images/bengali caption generator.png",
    tags: ["TensorFlow", "InceptionV3"],
    github: "https://github.com/Saptarshi2120/Bengali-Caption-Generator-",
    demo: "https://huggingface.co/spaces/Soumapriyo/BengaliCaption",
  },
  {
    title: "Electric Vehicle Market Segmentation",
    description: "Visualized and segmented EV data using PCA and clustering.",
    image: "/images/Electric Vehicle Market Segmentation.png",
    tags: ["Pandas", "Matplotlib"],
    github: "https://github.com/Saptarshi2120/Market-Segmentation",
    demo: null,
  },
  {
    title: "SafeWalk",
    description: "Real-time detection of mobile phone usage in no-phone zones using hardware + ML.",
    image: "/images/SafeWalk.png",
    tags: ["TensorFlow", "OpenCV", "Geofencing", "Sensors"],
    github: "https://github.com/Saptarshi2120/MobileSafety-Alert-Fine-System",
    demo: null,
  },
  {
    title: "Stock_Analysis",
    description: "S&P 500 price prediction using machine learning and backtesting engine.",
    image: "/images/Stock_Analysis.png",
    tags: ["yFinance", "scikit-learn", "pandas"],
    github: "https://github.com/Saptarshi2120/Stock_Analysis",
    demo: null,
  },
  {
    title: "Credit Card Fraud Detection",
    description: "Decision tree model optimized to detect credit card fraud in real-time.",
    image: "/images/Credit Card Fraud Detection.png",
    tags: ["Scikit-learn", "GridSearchCV"],
    github: "https://github.com/Saptarshi2120/Credit_card_fraud_detection",
    demo: null,
  },
  {
    title: "Flipkart_scrapping",
    description: "Web scraper to gather smartphone data under ₹50K using automation + scraping tools.",
    image: "/images/Flipkart_Web_Scraping.png",
    tags: ["Selenium", "BeautifulSoup", "requests"],
    github: "https://github.com/Saptarshi2120/Flipkart_scrapping",
    demo: null,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showAll, setShowAll] = useState(false)

  const displayedProjects = showAll ? projects : projects.slice(0, 3)

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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="max-w-5xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-center">
        My <span className="text-mint-green">Projects</span>
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12"></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex justify-center mt-12">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all duration-300"
        >
          {showAll ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              <span className="mr-2">Show More</span>
              <ChevronDown className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  )
}
