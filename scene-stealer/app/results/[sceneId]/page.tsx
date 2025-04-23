"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, RefreshCw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScoreBar from "@/components/score-bar"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for scenes
const mockScenes = {
  "1": {
    id: "1",
    title: "I'm the king of the world!",
    movie: "Titanic",
    year: 1997,
    videoUrl: "/placeholder.svg?height=720&width=1280",
  },
  "2": {
    id: "2",
    title: "You can't handle the truth!",
    movie: "A Few Good Men",
    year: 1992,
    videoUrl: "/placeholder.svg?height=720&width=1280",
  },
}

// Mock result data
const mockResults = {
  "1": {
    voiceEmotionScore: 82,
    facialEmotionScore: 75,
    totalScore: 80,
    feedback: {
      voice: "Great energy, pitch matched well with the original scene.",
      face: "Try more dramatic expressions for this iconic moment.",
    },
  },
  "2": {
    voiceEmotionScore: 88,
    facialEmotionScore: 92,
    totalScore: 90,
    feedback: {
      voice: "Excellent intensity and emotion in your delivery!",
      face: "Your facial expressions perfectly captured the anger and intensity.",
    },
  },
}

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const sceneId = params.sceneId as string
  const scene = mockScenes[sceneId as keyof typeof mockScenes]
  const result = mockResults[sceneId as keyof typeof mockResults]

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!scene || !result) {
      toast({
        title: "Result not found",
        description: "The requested result could not be found.",
        variant: "destructive",
      })
      router.push("/scenes")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [scene, result, router, toast])

  const handleShare = () => {
    toast({
      title: "Sharing",
      description: "This feature is coming soon!",
    })
  }

  const handleRetry = () => {
    router.push(`/recording/${sceneId}`)
  }

  const handleViewLeaderboard = () => {
    router.push("/leaderboard")
  }

  if (isLoading || !scene || !result) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-amber-500/20 mb-4">
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Calculating your score...</h2>
          <p className="text-zinc-400">Our AI is analyzing your performance</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-amber-400">Performance Results</h1>
            <p className="text-zinc-400">
              {scene.title} - {scene.movie} ({scene.year})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score breakdown */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Score Breakdown</CardTitle>
              <CardDescription className="text-zinc-400">See how well you matched the original scene</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <ScoreBar label="Voice Emotion Match" score={result.voiceEmotionScore} color="amber" />
                <ScoreBar label="Facial Emotion Match" score={result.facialEmotionScore} color="amber" />

                <div className="mt-8 mb-4">
                  <h3 className="text-lg font-bold text-white mb-4">Total Performance Score</h3>
                  <div className="flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="relative w-40 h-40 flex items-center justify-center"
                    >
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="10" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={283}
                          strokeDashoffset={283 - (283 * result.totalScore) / 100}
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * result.totalScore) / 100 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-white">{result.totalScore}</span>
                        <span className="text-sm text-zinc-400">out of 100</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-400 mb-1">Voice Feedback</h4>
                  <p className="text-sm text-zinc-300">{result.feedback.voice}</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-400 mb-1">Facial Feedback</h4>
                  <p className="text-sm text-zinc-300">{result.feedback.face}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 justify-between">
              <Button variant="outline" className="border-zinc-700 text-zinc-300" onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="border-zinc-700 text-zinc-300" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleViewLeaderboard}>
                  <Trophy className="mr-2 h-4 w-4" /> Leaderboard
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Video comparison */}
          <div className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Original Scene</CardTitle>
              </CardHeader>
              <CardContent>
                <video src={scene.videoUrl} controls className="w-full aspect-video bg-black rounded-md" />
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <video
                  src="/placeholder.svg?height=720&width=1280"
                  controls
                  className="w-full aspect-video bg-black rounded-md"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
