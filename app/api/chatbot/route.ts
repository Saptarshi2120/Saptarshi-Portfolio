import { type NextRequest, NextResponse } from "next/server"

// Conversation stages
type Stage = "greeting" | "feeling" | "opinion" | "favorites" | "joke" | "goodbye"

// Random topics for opinion stage
const topics = [
  "coding",
  "artificial intelligence",
  "data science",
  "Marvel movies",
  "social media",
  "remote work",
  "machine learning",
  "blockchain",
  "virtual reality",
  "space exploration",
]

// Random favorite categories
const favoriteCategories = [
  "food",
  "movie",
  "book",
  "superhero",
  "travel destination",
  "programming language",
  "hobby",
  "music genre",
  "animal",
  "season",
]

// Jokes for joke stage
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the data scientist go broke? Because he used all his cache!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "What's a computer's favorite snack? Microchips!",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
  "Why did the developer go broke? Because he used up all his cache!",
  "What's a database's favorite song? 'All by MySELF'!",
  "Why did the function go to therapy? It had too many complex issues!",
  "What do you call a group of 8 hobbits? A hobbyte!",
]

// Goodbye messages
const goodbyes = [
  "It was awesome chatting with you! Come back anytime!",
  "Thanks for the conversation! Have a fantastic day!",
  "It's been fun! Hope to see you again soon!",
  "Bye for now! Remember, I'm always here if you need me!",
  "Until next time! Stay curious and keep coding!",
  "It's been a pleasure! Wishing you a day as awesome as your code!",
  "Farewell! May your bugs be few and your solutions elegant!",
  "Goodbye! Remember, in a world of algorithms, be a function that makes others smile!",
  "Chat with you later! Keep being amazing!",
  "See you soon! Remember, even AI thinks you're pretty cool!",
]

// Generate random name if user skips
const randomNames = [
  "Explorer",
  "Voyager",
  "Stargazer",
  "Coder",
  "Innovator",
  "Dreamer",
  "Wanderer",
  "Creator",
  "Visionary",
  "Adventurer",
]

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to analyze sentiment
function analyzeSentiment(text: string): { sentiment: number; subjectivity: number } {
  // This is a simplified version since we can't use TextBlob directly in Next.js API routes
  // In a real implementation, you would use a proper NLP library or API

  // Positive words
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "happy",
    "joy",
    "love",
    "like",
    "best",
    "better",
    "awesome",
    "positive",
    "beautiful",
    "perfect",
    "nice",
    "enjoy",
    "fun",
  ]

  // Negative words
  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "worst",
    "hate",
    "dislike",
    "sad",
    "angry",
    "upset",
    "poor",
    "negative",
    "wrong",
    "difficult",
    "hard",
    "boring",
    "annoying",
    "disappointing",
  ]

  // Subjective words
  const subjectiveWords = [
    "think",
    "believe",
    "feel",
    "opinion",
    "seems",
    "appears",
    "maybe",
    "perhaps",
    "probably",
    "possibly",
    "might",
    "could",
    "should",
    "would",
    "personal",
    "perspective",
    "view",
  ]

  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\W+/)

  let positiveCount = 0
  let negativeCount = 0
  let subjectiveCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
    if (subjectiveWords.includes(word)) subjectiveCount++
  })

  const totalWords = words.length || 1 // Avoid division by zero

  // Calculate sentiment (-1 to 1)
  const sentiment = (positiveCount - negativeCount) / totalWords

  // Calculate subjectivity (0 to 1)
  const subjectivity = subjectiveCount / totalWords

  return {
    sentiment: Math.max(-1, Math.min(1, sentiment * 5)), // Scale for more pronounced results
    subjectivity: Math.min(1, subjectivity * 3), // Scale for more pronounced results
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, stage, userName } = await request.json()

    let response = ""
    let nextStage: Stage = stage
    let updatedUserName = userName

    // Handle conversation based on stage
    switch (stage) {
      case "greeting":
        // Handle name input
        if (!message.trim()) {
          updatedUserName = getRandomItem(randomNames)
          response = `Since you didn't share your name, I'll call you ${updatedUserName}! How are you feeling today?`
        } else {
          updatedUserName = message.trim().split(" ")[0] // Get first name/word
          response = `Nice to meet you, ${updatedUserName}! How are you feeling today?`
        }
        nextStage = "feeling"
        break

      case "feeling":
        // Analyze sentiment of feeling
        const feelingSentiment = analyzeSentiment(message)

        if (feelingSentiment.sentiment > 0.3) {
          response = `That's wonderful to hear! I'm glad you're doing well. `
        } else if (feelingSentiment.sentiment < -0.3) {
          response = `I'm sorry to hear that. I hope things get better soon. `
        } else {
          response = `Thanks for sharing how you're feeling. `
        }

        // Move to opinion stage
        const topic = getRandomItem(topics)
        response += `I'm curious, what do you think about ${topic}?`
        nextStage = "opinion"
        break

      case "opinion":
        // Analyze opinion sentiment and subjectivity
        const opinionAnalysis = analyzeSentiment(message)

        if (opinionAnalysis.subjectivity > 0.5) {
          response = "You have some strong opinions there! "
        } else if (opinionAnalysis.subjectivity > 0.2) {
          response = "That's an interesting perspective. "
        } else {
          response = "Thanks for sharing your thoughts. "
        }

        if (opinionAnalysis.sentiment > 0.3) {
          response += "I can tell you're quite positive about this topic! "
        } else if (opinionAnalysis.sentiment < -0.3) {
          response += "I sense you have some concerns about this subject. "
        }

        // Move to favorites game
        const category = getRandomItem(favoriteCategories)
        response += `\n\nLet's play a quick favorites game! What's your favorite ${category}?`
        nextStage = "favorites"
        break

      case "favorites":
        // Respond to favorite
        response = `${message}? That's a fantastic choice! `

        // Offer a joke
        response += "Would you like to hear a joke before we wrap up? (yes/no)"
        nextStage = "joke"
        break

      case "joke":
        // Check if user wants a joke
        if (
          message.toLowerCase().includes("yes") ||
          message.toLowerCase().includes("sure") ||
          message.toLowerCase().includes("ok")
        ) {
          const joke = getRandomItem(jokes)
          response = `Here you go: ${joke} 😄\n\n`
        } else {
          response = "No problem! "
        }

        // Move to goodbye
        response += getRandomItem(goodbyes)
        nextStage = "goodbye"
        break

      case "goodbye":
        // If user continues after goodbye
        response = "I hope you enjoyed our chat! If you'd like to start a new conversation, just say hello again."
        nextStage = "greeting"
        break

      default:
        response = "I'm not sure what to say. Let's start over. What's your name?"
        nextStage = "greeting"
    }

    return NextResponse.json({
      response,
      nextStage,
      userName: updatedUserName,
    })
  } catch (error) {
    console.error("Error processing chatbot request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
