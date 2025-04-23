"use client"

import { motion } from "framer-motion"

interface ScoreBarProps {
  label: string
  score: number
  maxScore?: number
  color?: string
}

export default function ScoreBar({ label, score, maxScore = 100, color = "amber" }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100

  const getColorClass = () => {
    switch (color) {
      case "red":
        return "from-red-500 to-red-700"
      case "green":
        return "from-green-500 to-green-700"
      case "blue":
        return "from-blue-500 to-blue-700"
      case "amber":
      default:
        return "from-amber-500 to-amber-700"
    }
  }

  const getScoreEmoji = () => {
    if (percentage >= 90) return "🌟"
    if (percentage >= 75) return "😄"
    if (percentage >= 60) return "🙂"
    if (percentage >= 40) return "😐"
    return "😕"
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <div className="flex items-center">
          <span className="text-sm font-bold text-white mr-2">
            {score}/{maxScore}
          </span>
          <span className="text-lg">{getScoreEmoji()}</span>
        </div>
      </div>
      <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${getColorClass()}`}
        />
      </div>
    </div>
  )
}
