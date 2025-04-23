"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SceneCard, { type SceneProps } from "@/components/scene-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Mock data for scenes
const mockScenes: SceneProps[] = [
  {
    id: "1",
    title: "I'm the king of the world!",
    movie: "Titanic",
    year: 1997,
    duration: "1:45",
    difficulty: "Easy",
    genre: "Drama",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "2",
    title: "You can't handle the truth!",
    movie: "A Few Good Men",
    year: 1992,
    duration: "2:10",
    difficulty: "Medium",
    genre: "Drama",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "3",
    title: "I'll be back",
    movie: "The Terminator",
    year: 1984,
    duration: "0:45",
    difficulty: "Easy",
    genre: "Action",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "4",
    title: "May the Force be with you",
    movie: "Star Wars",
    year: 1977,
    duration: "1:30",
    difficulty: "Medium",
    genre: "Sci-Fi",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "5",
    title: "You talking to me?",
    movie: "Taxi Driver",
    year: 1976,
    duration: "1:15",
    difficulty: "Hard",
    genre: "Drama",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "6",
    title: "Here's Johnny!",
    movie: "The Shining",
    year: 1980,
    duration: "1:05",
    difficulty: "Hard",
    genre: "Horror",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "7",
    title: "I see dead people",
    movie: "The Sixth Sense",
    year: 1999,
    duration: "1:20",
    difficulty: "Medium",
    genre: "Thriller",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: "8",
    title: "Life is like a box of chocolates",
    movie: "Forrest Gump",
    year: 1994,
    duration: "1:40",
    difficulty: "Easy",
    genre: "Drama",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
]

export default function ScenesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")

  const filteredScenes = mockScenes.filter((scene) => {
    const matchesSearch =
      searchTerm === "" ||
      scene.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scene.movie.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = genreFilter === "" || scene.genre === genreFilter

    const matchesDifficulty = difficultyFilter === "" || scene.difficulty === difficultyFilter

    return matchesSearch && matchesGenre && matchesDifficulty
  })

  const genres = Array.from(new Set(mockScenes.map((scene) => scene.genre)))
  const difficulties = ["Easy", "Medium", "Hard"]

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-2 text-amber-400">Movie Scenes</h1>
        <p className="text-zinc-400 mb-8">Choose a scene to re-enact and show off your acting skills</p>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search scenes or movies..."
              className="pl-10 bg-zinc-900 border-zinc-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-40">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Scene grid */}
        {filteredScenes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredScenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No scenes found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 border-zinc-700 text-zinc-300"
              onClick={() => {
                setSearchTerm("")
                setGenreFilter("all")
                setDifficultyFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
