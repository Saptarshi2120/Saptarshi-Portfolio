"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const initialCertificates = [
{
    title: "Java Collections + Lambdas",
    issuer: "Udemy",
    date: "November 2022",
    link: "https://www.udemy.com/certificate/UC-aca4bdf5-9e59-4cc0-9cb3-3853877de31d",
  },
  {
    title: "Python + Flask",
    issuer: "Udemy",
    date: "March 2023",
    link: "https://www.udemy.com/certificate/UC-a92c9b86-7a99-450d-8b60-789aa8909fe7/",
  },
  {
    title: "Excel Analysis",
    issuer: "Coursera",
    date: "January 2023",
    link: "https://www.coursera.org/account/accomplishments/certificate/RJ4Z9J6A3U44",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "Coursera",
    date: "March 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/4UASLWWY4XLH",
  },
]

const additionalCertificates = [
  {
    title: "Data Science Fundamentals",
    issuer: "DataCamp",
    date: "June 2022",
    link: "https://www.datacamp.com/certificate/data-science-fundamentals",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera",
    date: "April 2022",
    link: "https://www.coursera.org/certificate/ml-specialization",
  },
  {
    title: "Deep Learning with PyTorch",
    issuer: "Udacity",
    date: "February 2022",
    link: "https://www.udacity.com/certificate/deep-learning-pytorch",
  },
  {
    title: "SQL for Data Analysis",
    issuer: "Codecademy",
    date: "December 2021",
    link: "https://www.codecademy.com/certificate/sql-data-analysis",
  },
]

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showMore, setShowMore] = useState(false)

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

  const renderCertificate = (cert, index) => (
    <motion.div
      key={cert.title}
      variants={itemVariants}
      className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 hover:shadow-lg hover:shadow-mint-green/10 transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <Award className="w-12 h-12 text-mint-green" />
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">{cert.title}</h3>
      <p className="text-gray-400 text-center mb-1">{cert.issuer}</p>
      <p className="text-gray-500 text-center mb-4">{cert.date}</p>
      <div className="flex justify-center">
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-300 hover:text-mint-green transition-colors duration-300"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          <span>View Certificate</span>
        </a>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="max-w-5xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-center">
        My <span className="text-mint-green">Certificates</span>
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12"></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {initialCertificates.map((cert, index) => renderCertificate(cert, index))}
      </div>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 overflow-hidden"
          >
            {additionalCertificates.map((cert, index) => renderCertificate(cert, index))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="flex justify-center mt-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all duration-300"
        >
          {showMore ? (
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
