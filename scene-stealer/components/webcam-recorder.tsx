"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Webcam from "react-webcam"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Square, RefreshCw, Check, Video, Mic, MicOff, VideoOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WebcamRecorderProps {
  sceneId: string
  onRecordingComplete: (blob: Blob) => void
  onCancel: () => void
}

export default function WebcamRecorder({ sceneId, onRecordingComplete, onCancel }: WebcamRecorderProps) {
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [countdown, setCountdown] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingPreview, setRecordingPreview] = useState<string | null>(null)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const { toast } = useToast()

  // Max recording time in seconds
  const MAX_RECORDING_TIME = 120

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0 && capturing) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME) {
            handleStopCapture()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [countdown, capturing])

  const handleStartCapture = useCallback(() => {
    setCountdown(3)

    const countdownTimer = setTimeout(() => {
      setCapturing(true)
      setRecordingTime(0)
      setRecordedChunks([])

      if (webcamRef.current && webcamRef.current.stream) {
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm",
        })

        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable)
        mediaRecorderRef.current.start()
      } else {
        toast({
          title: "Camera Error",
          description: "Could not access camera or microphone.",
          variant: "destructive",
        })
      }
    }, 3000)

    return () => clearTimeout(countdownTimer)
  }, [webcamRef, setCapturing, setRecordedChunks])

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => [...prev, data])
      }
    },
    [setRecordedChunks],
  )

  const handleStopCapture = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  const handleSubmit = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      })
      onRecordingComplete(blob)
      setRecordedChunks([])
      setRecordingPreview(null)
    }
  }, [recordedChunks, onRecordingComplete])

  const handlePreview = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      })
      const url = URL.createObjectURL(blob)
      setRecordingPreview(url)
    }
  }, [recordedChunks])

  const handleReset = useCallback(() => {
    setRecordedChunks([])
    setRecordingPreview(null)
    setRecordingTime(0)
  }, [])

  const toggleCamera = useCallback(() => {
    setCameraEnabled((prev) => !prev)
  }, [])

  const toggleMic = useCallback(() => {
    setMicEnabled((prev) => !prev)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
      <div className="relative">
        {recordingPreview ? (
          <video src={recordingPreview} controls className="w-full aspect-video bg-black" />
        ) : (
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            {cameraEnabled ? (
              <Webcam
                audio={micEnabled}
                ref={webcamRef}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-500">
                <VideoOff size={48} />
                <p className="mt-2">Camera is disabled</p>
              </div>
            )}

            {countdown > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/70"
              >
                <div className="text-6xl font-bold text-amber-500">{countdown}</div>
              </motion.div>
            )}

            {capturing && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-sm font-medium">{formatTime(recordingTime)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {recordingTime > 0 && !capturing && !recordingPreview && (
          <div className="mb-4">
            <p className="text-sm text-zinc-400 mb-1">Recording length: {formatTime(recordingTime)}</p>
            <Progress value={(recordingTime / MAX_RECORDING_TIME) * 100} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-between">
          {!recordingPreview ? (
            <>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`${cameraEnabled ? "bg-zinc-800" : "bg-red-900/30"} border-zinc-700`}
                  onClick={toggleCamera}
                >
                  {cameraEnabled ? <Video size={18} /> : <VideoOff size={18} />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${micEnabled ? "bg-zinc-800" : "bg-red-900/30"} border-zinc-700`}
                  onClick={toggleMic}
                >
                  {micEnabled ? <Mic size={18} /> : <MicOff size={18} />}
                </Button>
              </div>

              <div className="flex gap-2">
                {!capturing ? (
                  <>
                    {recordedChunks.length > 0 && (
                      <Button variant="outline" className="border-zinc-700 text-zinc-300" onClick={handleReset}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Reset
                      </Button>
                    )}
                    {recordedChunks.length > 0 ? (
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handlePreview}>
                        Preview
                      </Button>
                    ) : (
                      <Button
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={handleStartCapture}
                        disabled={!cameraEnabled}
                      >
                        <Play className="mr-2 h-4 w-4" /> Start Recording
                      </Button>
                    )}
                  </>
                ) : (
                  <Button variant="destructive" onClick={handleStopCapture}>
                    <Square className="mr-2 h-4 w-4" /> Stop Recording
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-2 w-full justify-between">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300"
                onClick={() => {
                  setRecordingPreview(null)
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Re-record
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleSubmit}>
                <Check className="mr-2 h-4 w-4" /> Submit Recording
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
