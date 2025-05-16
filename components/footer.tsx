import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Link href="#home" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">Saptarshi Dey</span>
            </Link>
            <p className="text-gray-400 mt-2 max-w-md">
              Data Analyst passionate about solving real-world problems with data science, machine learning, and
              visualization.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
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
            <p className="text-gray-500 text-sm">&copy; {currentYear} Saptarshi Dey. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
