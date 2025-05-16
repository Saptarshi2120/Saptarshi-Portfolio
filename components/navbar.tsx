"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "./logo"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openResume = () => {
    window.open("https://drive.google.com/file/d/1WRt4_Z9fRnhz9f43g9Sz9wYWA32F01C8/view?usp=drive_link", "_blank")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="#home" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">Saptarshi Dey</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-mint-green transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={openResume}
              className="ml-8 px-4 py-2 bg-mint-green text-slate-900 font-medium rounded-lg hover:bg-mint-green/90 transition-colors duration-300 flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-slate-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={openResume}
              className="w-full mt-2 px-3 py-2 bg-mint-green text-slate-900 font-medium rounded-md hover:bg-mint-green/90 transition-colors duration-300 flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
