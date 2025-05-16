"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Smile, Loader } from "lucide-react"
import ChatMessage from "./chat-message"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState("greeting")
  const [userName, setUserName] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        text: "Hi there! 👋 I'm ChatterNova 🌟, your friendly AI assistant. What's your name or nickname?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Send message to backend
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          stage: conversationStage,
          userName: userName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Update conversation state
      if (data.nextStage) {
        setConversationStage(data.nextStage)
      }

      if (data.userName && conversationStage === "greeting") {
        setUserName(data.userName)
      }

      // Add bot response with a slight delay to simulate typing
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, 500)
    } catch (error) {
      console.error("Error:", error)

      // Add error message
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsTyping(false)
      }, 500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Chatbot Icon */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
        }}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Smile className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">ChatterNova 🌟</h3>
                  <p className="text-xs text-blue-100">AI Assistant</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-blue-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-700/50 w-fit mt-2">
                  <Loader className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-sm text-blue-300">ChatterNova is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-slate-800 border-t border-slate-700">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-r-lg hover:opacity-90 transition-opacity"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
