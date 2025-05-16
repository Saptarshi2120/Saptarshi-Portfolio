"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xdkgkkgr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        const data = await response.json()
        alert(data?.errors?.[0]?.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again.")
    }

    setIsSubmitting(false)
  }

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
        Contact <span className="text-mint-green">Me</span>
      </motion.h2>
      <motion.div variants={itemVariants} className="w-20 h-1 bg-mint-green mx-auto mb-12"></motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
          <p className="text-gray-300 mb-8">
            Feel free to reach out to me for any questions, opportunities, or just to say hello. I'll get back to you as
            soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-slate-800 p-3 rounded-full">
                <Mail className="w-6 h-6 text-mint-green" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Email</h4>
                <a
                  href="mailto:saptarshidey2120@gmail.com"
                  className="text-gray-300 hover:text-mint-green transition-colors duration-300"
                >
                  saptarshidey2120@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-slate-800 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-mint-green" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Location</h4>
                <p className="text-gray-300">Kolkata, West Bengal</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-slate-800 p-3 rounded-full">
                <Phone className="w-6 h-6 text-mint-green" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Phone</h4>
                <a
                  href="tel:+918116850597"
                  className="text-gray-300 hover:text-mint-green transition-colors duration-300"
                >
                  (+91) 8116850597
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12"
              >
                <CheckCircle className="w-16 h-16 text-mint-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-300 text-center">Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green text-white"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green text-white"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green text-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-mint-green text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
