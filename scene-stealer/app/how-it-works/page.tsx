"use client"

import { motion } from "framer-motion"
import { Film, Mic, Video, Brain, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Film className="h-10 w-10 text-amber-400" />,
      title: "Choose a Scene",
      description: "Browse our collection of iconic movie scenes from various genres and difficulty levels.",
    },
    {
      icon: <Video className="h-10 w-10 text-amber-400" />,
      title: "Watch the Original",
      description: "Study the original scene to understand the emotions, timing, and delivery of the lines.",
    },
    {
      icon: <Mic className="h-10 w-10 text-amber-400" />,
      title: "Record Your Performance",
      description: "Use your webcam and microphone to record yourself acting out the scene.",
    },
    {
      icon: <Brain className="h-10 w-10 text-amber-400" />,
      title: "AI Analysis",
      description: "Our AI analyzes your voice emotion and facial expressions to compare with the original scene.",
    },
    {
      icon: <Award className="h-10 w-10 text-amber-400" />,
      title: "Get Your Score",
      description: "Receive detailed feedback and scores on how well your performance matched the original scene.",
    },
  ]

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-amber-400">How It Works</h1>
          <p className="text-xl text-zinc-300">
            Actify uses advanced AI to analyze and score your acting performances
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-amber-500 to-amber-700 hidden md:block" />

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12"
              >
                <div className="bg-zinc-900 p-4 rounded-full border-2 border-amber-500 z-10">{step.icon}</div>
                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-zinc-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-none"
            >
              <Link href="/scenes">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-16 bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">The Technology Behind Actify</h2>
            <p className="text-zinc-300 mb-4">
              Actify uses advanced AI models to analyze your acting performance:
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-2">
                <div className="bg-amber-500/20 p-1 rounded mt-1">
                  <Mic className="h-4 w-4 text-amber-500" />
                </div>
                <span>
                  <strong className="text-white">Voice Emotion Analysis:</strong> Our voice model detects emotions like
                  happiness, anger, sadness, and fear in your voice, comparing them to the original scene.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-amber-500/20 p-1 rounded mt-1">
                  <Video className="h-4 w-4 text-amber-500" />
                </div>
                <span>
                  <strong className="text-white">Facial Expression Analysis:</strong> Our facial recognition model
                  tracks your expressions and compares them to the emotional beats of the original performance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-amber-500/20 p-1 rounded mt-1">
                  <Brain className="h-4 w-4 text-amber-500" />
                </div>
                <span>
                  <strong className="text-white">Performance Scoring:</strong> Our algorithm combines both analyses to
                  give you a comprehensive score and personalized feedback to improve your acting skills.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
