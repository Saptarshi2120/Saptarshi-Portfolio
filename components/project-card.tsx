"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string | null
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl hover:shadow-mint-green/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-mint-green">{project.title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                backgroundColor: tag.includes("Tensor")
                  ? "#FF6F61"
                  : tag.includes("VGG")
                    ? "#6B5B95"
                    : tag.includes("Scikit")
                      ? "#88B04B"
                      : tag.includes("Grid")
                        ? "#88B04B"
                        : tag.includes("Pandas")
                          ? "#92A8D1"
                          : tag.includes("Matplotlib")
                            ? "#955251"
                            : tag.includes("Audio")
                              ? "#D65076"
                              : tag.includes("OpenCV")
                                ? "#45B8AC"
                                : tag.includes("Inception")
                                  ? "#EFC050"
                                  : tag.includes("TMDB")
                                    ? "#5B5EA6"
                                    : "#009B77",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors duration-300"
          >
            <Github className="w-4 h-4 mr-2" />
            <span>View Project</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-mint-green hover:bg-mint-green/90 rounded-lg text-slate-900 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
