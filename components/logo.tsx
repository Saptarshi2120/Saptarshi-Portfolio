import { BarChart2 } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-mint-green">
      <div className="relative">
        <span className="absolute -top-1 -left-1 text-white font-bold text-lg">S</span>
        <span className="absolute -bottom-1 -right-1 text-white font-bold text-lg">D</span>
        <BarChart2 className="w-5 h-5 text-white opacity-50" />
      </div>
    </div>
  )
}
