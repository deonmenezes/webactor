"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface SceneProps {
  id: string
  title: string
  movie: string
  year: number
  duration: string
  difficulty: "Easy" | "Medium" | "Hard"
  genre: string
  imageUrl: string
}

export default function SceneCard({ scene }: { scene: SceneProps }) {
  const [isHovered, setIsHovered] = useState(false)

  const difficultyColor = {
    Easy: "bg-green-500",
    Medium: "bg-amber-500",
    Hard: "bg-red-500",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={scene.imageUrl || "/placeholder.svg"}
          alt={`${scene.movie} - ${scene.title}`}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
            {scene.genre}
          </Badge>
          <Badge variant="secondary" className={`${difficultyColor[scene.difficulty]} text-white`}>
            {scene.difficulty}
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{scene.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-300">
              {scene.movie} ({scene.year})
            </p>
            <p className="text-xs text-zinc-400">{scene.duration}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
            <Link href={`/recording/${scene.id}`}>
              <Play className="mr-2 h-5 w-5" /> Re-enact
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
