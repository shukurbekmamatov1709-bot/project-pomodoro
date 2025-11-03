



import { useState, useRef, useEffect } from "react"
import { Card } from "./Card"
import { CardHeader } from "./CardHeader"
import { CardTitle } from "./CardTitle"
import { CardContent } from "./CardContent"
import Settings from "./Settings"

type Timer = {
  title: string
  time: number
  color: string
}

const PomodoroTimer = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartPomodoros: false,
    autoStartBreaks: false,
    longBreakInterval: 2,
  })

  // Основной тёмный фон для каждого режима
  const timers: Timer[] = [
    { title: "Pomodoro", time: settings.pomodoro * 60, color: "bg-red-500" },
    { title: "Short Break", time: settings.shortBreak * 60, color: "bg-green-500" },
    { title: "Long Break", time: settings.longBreak * 60, color: "bg-blue-500" },
  ]

  // Внутренний светлый фон для таймера
  const innerColors: Record<string, string> = {
    Pomodoro: "bg-red-300/20",
    "Short Break": "bg-green-300/20",
    "Long Break": "bg-blue-300/20",
  }

  const [activeMode, setActiveMode] = useState<Timer>(timers[0])
  const [secondsLeft, setSecondsLeft] = useState(activeMode.time)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)

  const intervalRef = useRef<number | null>(null)

  const handleModeChange = (mode: Timer) => {
    setActiveMode(mode)
    setSecondsLeft(mode.time)
    setIsRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleNextStage = () => {
    if (activeMode.title === "Pomodoro") {
      const nextCount = pomodoroCount + 1
      if (nextCount < settings.longBreakInterval) {
        setPomodoroCount(nextCount)
        handleModeChange(timers[1]) // Short Break
      } else {
        setPomodoroCount(0)
        handleModeChange(timers[2]) // Long Break
      }
    } else {
      handleModeChange(timers[0]) // Back to Pomodoro
    }
  }

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!)
      setIsRunning(false)
    } else {
      setIsRunning(true)
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            handleNextStage()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    setSecondsLeft(activeMode.time)
  }, [activeMode])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (showSettings) {
    return (
      <Settings
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings)
          setShowSettings(false)
        }}
        onClose={() => setShowSettings(false)}
      />
    )
  }

  return (
    <div
      className={`${activeMode.color} min-h-screen flex items-center justify-center transition-colors duration-500`}
    >
      <Card className="w-140 rounded-2xl shadow-xl flex flex-col text-white relative">
        <div className="absolute top-0 right-2">
          <button
            onClick={() => setShowSettings(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
             Settings
          </button>
        </div>

        {/* Внутренний светлый фон */}
        <div className={`${innerColors[activeMode.title]} rounded-2xl p-10 w-full`}>
          <CardHeader>
            <div className="flex gap-3 justify-center mb-4">
              {timers.map((mode) => (
                <button
                  key={mode.title}
                  className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
                    activeMode.title === mode.title
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  }`}
                  onClick={() => handleModeChange(mode)}
                >
                  {mode.title}
                </button>
              ))}
            </div>
            <CardTitle className="text-center text-2xl font-bold">{activeMode.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center">
            <p className="text-7xl font-mono font-bold mb-6">{formatTime(secondsLeft)}</p>

            {!isRunning ? (
              <button
                onClick={toggleTimer}
                className="w-full bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                START
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={toggleTimer}
                  className="flex-1 bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  PAUSE
                </button>
                <button
                  onClick={handleNextStage}
                  className="flex-1 bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition text-xl"
                >
                  ▶️
                </button>
              </div>
            )}

      
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default PomodoroTimer