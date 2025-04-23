"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import WebcamRecorder from "@/components/webcam-recorder"
import { useToast } from "@/hooks/use-toast"

// Mock data for scenes
const mockScenes = {
  "1": {
    id: "1",
    title: "I'm the king of the world!",
    movie: "Titanic",
    year: 1997,
    videoUrl: "/placeholder.svg?height=720&width=1280",
    subtitles: [
      { start: 0, end: 2, text: "Jack: Come on, Rose." },
      { start: 3, end: 6, text: "Jack: I'll show you something." },
      { start: 7, end: 12, text: "Jack: I'm the king of the world!" },
    ],
  },
  "2": {
    id: "2",
    title: "You can't handle the truth!",
    movie: "A Few Good Men",
    year: 1992,
    videoUrl: "/placeholder.svg?height=720&width=1280",
    subtitles: [
      { start: 0, end: 3, text: "Kaffee: I want the truth!" },
      { start: 4, end: 10, text: "Col. Jessup: You can't handle the truth!" },
    ],
  },
}

export default function RecordingPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const sceneId = params.sceneId as string
  const scene = mockScenes[sceneId as keyof typeof mockScenes]

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!scene) {
      toast({
        title: "Scene not found",
        description: "The requested scene could not be found.",
        variant: "destructive",
      })
      router.push("/scenes")
    }
  }, [scene, router, toast])

  useEffect(() => {
    if (videoRef.current && scene) {
      const updateSubtitles = () => {
        const currentTime = videoRef.current?.currentTime || 0
        const subtitle = scene.subtitles.find((sub) => currentTime >= sub.start && currentTime <= sub.end)
        setCurrentSubtitle(subtitle ? subtitle.text : "")
      }

      const videoElement = videoRef.current
      videoElement.addEventListener("timeupdate", updateSubtitles)

      return () => {
        videoElement.removeEventListener("timeupdate", updateSubtitles)
      }
    }
  }, [scene])

  const handleRecordingComplete = async (blob: Blob) => {
    setIsSubmitting(true)

    // Create form data for submission
    const formData = new FormData()
    formData.append("video", blob, "recording.webm")
    formData.append("scene_id", sceneId)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to results page
      router.push(`/results/${sceneId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your recording. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (!scene) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
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
            <h1 className="text-2xl font-bold text-amber-400">{scene.title}</h1>
            <p className="text-zinc-400">
              {scene.movie} ({scene.year})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original scene */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <div className="relative">
              <video ref={videoRef} src={scene.videoUrl} controls className="w-full aspect-video bg-black" />
              {currentSubtitle && (
                <div className="absolute bottom-4 left-0 right-0 mx-auto text-center">
                  <div className="inline-block bg-black/80 px-4 py-2 rounded text-white text-lg">{currentSubtitle}</div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-white mb-2">Original Scene</h3>
              <p className="text-sm text-zinc-400">Watch the original scene first, then record your performance.</p>
            </div>
          </div>

          {/* Webcam recorder */}
          <div>
            <WebcamRecorder sceneId={sceneId} onRecordingComplete={handleRecordingComplete} onCancel={() => {}} />
          </div>
        </div>

        {isSubmitting && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 max-w-md w-full text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-amber-500" />
              <h3 className="text-xl font-bold text-white mb-2">Processing Your Performance</h3>
              <p className="text-zinc-400">We're analyzing your acting skills. This may take a moment...</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
