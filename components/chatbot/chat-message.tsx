"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  return (
    <motion.div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isBot
            ? "bg-slate-700 text-white rounded-tl-none"
            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isBot ? "text-slate-400" : "text-blue-200"}`}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  )
}
