"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: 1,
    username: "MovieMaster",
    sceneId: "1",
    sceneName: "I'm the king of the world!",
    movie: "Titanic",
    score: 95,
    date: "2023-04-15",
  },
  {
    id: 2,
    username: "ActingQueen",
    sceneId: "2",
    sceneName: "You can't handle the truth!",
    movie: "A Few Good Men",
    score: 92,
    date: "2023-04-16",
  },
  {
    id: 3,
    username: "SceneStealerPro",
    sceneId: "3",
    sceneName: "I'll be back",
    movie: "The Terminator",
    score: 90,
    date: "2023-04-14",
  },
  {
    id: 4,
    username: "CinematicGenius",
    sceneId: "4",
    sceneName: "May the Force be with you",
    movie: "Star Wars",
    score: 88,
    date: "2023-04-17",
  },
  {
    id: 5,
    username: "DramaKing",
    sceneId: "5",
    sceneName: "You talking to me?",
    movie: "Taxi Driver",
    score: 87,
    date: "2023-04-13",
  },
  {
    id: 6,
    username: "MovieBuff42",
    sceneId: "6",
    sceneName: "Here's Johnny!",
    movie: "The Shining",
    score: 85,
    date: "2023-04-12",
  },
  {
    id: 7,
    username: "ActorExtraordinaire",
    sceneId: "7",
    sceneName: "I see dead people",
    movie: "The Sixth Sense",
    score: 83,
    date: "2023-04-11",
  },
  {
    id: 8,
    username: "FilmFanatic",
    sceneId: "8",
    sceneName: "Life is like a box of chocolates",
    movie: "Forrest Gump",
    score: 82,
    date: "2023-04-10",
  },
  {
    id: 9,
    username: "SceneQueen",
    sceneId: "1",
    sceneName: "I'm the king of the world!",
    movie: "Titanic",
    score: 80,
    date: "2023-04-09",
  },
  {
    id: 10,
    username: "CinemaStar",
    sceneId: "2",
    sceneName: "You can't handle the truth!",
    movie: "A Few Good Men",
    score: 78,
    date: "2023-04-08",
  },
]

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [sceneFilter, setSceneFilter] = useState("all")

  // Get unique scenes for filter
  const uniqueScenes = Array.from(new Set(mockLeaderboard.map((entry) => entry.sceneId))).map((sceneId) => {
    const entry = mockLeaderboard.find((e) => e.sceneId === sceneId)
    return {
      id: sceneId,
      name: entry ? `${entry.sceneName} (${entry.movie})` : "",
    }
  })

  // Filter leaderboard data
  const filteredLeaderboard = mockLeaderboard.filter((entry) => {
    if (sceneFilter !== "all" && entry.sceneId !== sceneFilter) {
      return false
    }

    // Time filtering would be implemented here with real dates
    return true
  })

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-amber-400 flex items-center">
              <Trophy className="mr-3 h-8 w-8" /> Leaderboard
            </h1>
            <p className="text-zinc-400">See who's stealing the spotlight with the best performances</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="w-40">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-64">
              <Select value={sceneFilter} onValueChange={setSceneFilter}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Scene" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="all">All Scenes</SelectItem>
                  {uniqueScenes.map((scene) => (
                    <SelectItem key={scene.id} value={scene.id}>
                      {scene.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="mb-12 hidden md:block">
          <div className="flex justify-center items-end h-64 gap-4">
            {filteredLeaderboard.slice(0, 3).map((entry, index) => {
              const podiumHeight = index === 0 ? "h-64" : index === 1 ? "h-52" : "h-40"
              const medalColor = index === 0 ? "text-amber-400" : index === 1 ? "text-zinc-300" : "text-amber-700"

              return (
                <motion.div
                  key={entry.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${podiumHeight} w-64 flex flex-col`}
                >
                  <div className="flex-grow flex flex-col items-center justify-end p-4">
                    <div className={`text-4xl mb-2 ${medalColor}`}>
                      {index === 0 ? (
                        <Trophy className="h-12 w-12" />
                      ) : index === 1 ? (
                        <Medal className="h-10 w-10" />
                      ) : (
                        <Medal className="h-8 w-8" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-white text-xl">{entry.username}</p>
                      <p className="text-amber-400 font-bold text-2xl">{entry.score}</p>
                      <p className="text-sm text-zinc-400 truncate max-w-full">{entry.sceneName}</p>
                    </div>
                  </div>
                  <div
                    className={`w-full h-12 rounded-t-lg ${
                      index === 0
                        ? "bg-gradient-to-t from-amber-600 to-amber-400"
                        : index === 1
                          ? "bg-gradient-to-t from-zinc-600 to-zinc-400"
                          : "bg-gradient-to-t from-amber-900 to-amber-700"
                    }`}
                  >
                    <div className="flex items-center justify-center h-full text-2xl font-bold text-white">
                      #{index + 1}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="text-zinc-400 w-16 text-center">Rank</TableHead>
                <TableHead className="text-zinc-400">User</TableHead>
                <TableHead className="text-zinc-400">Scene</TableHead>
                <TableHead className="text-zinc-400">Movie</TableHead>
                <TableHead className="text-zinc-400 text-right">Score</TableHead>
                <TableHead className="text-zinc-400 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaderboard.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  className={`border-zinc-800 hover:bg-zinc-800/50 ${index < 3 ? "bg-zinc-800/30" : ""}`}
                >
                  <TableCell className="font-medium text-center">
                    <div className="flex items-center justify-center">
                      {index === 0 ? (
                        <div className="bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      ) : index === 1 ? (
                        <div className="bg-zinc-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      ) : index === 2 ? (
                        <div className="bg-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      ) : (
                        <div className="text-zinc-400">{index + 1}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-white">{entry.username}</TableCell>
                  <TableCell className="text-zinc-300">{entry.sceneName}</TableCell>
                  <TableCell className="text-zinc-300">{entry.movie}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <span className="font-bold text-amber-400 mr-1">{entry.score}</span>
                      {index < 3 && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-zinc-400">{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
