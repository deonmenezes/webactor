"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero content */}
      <div className="container relative z-20 px-4 py-32 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
            Scene Stealer
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-zinc-300">Step into the Scene. Be the Star.</p>
          <p className="text-md md:text-lg mb-12 text-zinc-400 max-w-2xl mx-auto">
            Act out your favorite movie scenes, record your performance, and get scored using AI. Become the star of
            your own cinematic masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-none"
            >
              <Link href="/scenes">
                <Play className="mr-2 h-5 w-5" /> Start Acting
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Link href="/how-it-works">
                How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Feature highlights */}
      <div className="container relative z-20 px-4 pb-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Act",
              description: "Choose from a variety of iconic movie scenes to perform",
              icon: "🎭",
            },
            {
              title: "Record",
              description: "Use your webcam to record your performance alongside the original scene",
              icon: "🎬",
            },
            {
              title: "Score",
              description: "Get scored on how well your emotions match the original scene",
              icon: "🏆",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:border-amber-900/50 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-amber-400">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
