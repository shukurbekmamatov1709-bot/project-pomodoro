


import { useState, useRef, useEffect } from "react"
import { Card } from "./Card"
import { CardHeader } from "./CardHeader"
// import { CardTitle } from "./CardTitle"
import { CardContent } from "./CardContent"
// import Settings from "./Settings"
import SettingsModal from "./SettingsModal"

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
    longBreakInterval: 3,
  })

  const timers: Timer[] = [
    { title: "Pomodoro", time: settings.pomodoro * 60, color: "bg-[#C04040]" },
    { title: "Short Break", time: settings.shortBreak * 60, color: "bg-[#064F4F]" },
    { title: "Long Break", time: settings.longBreak * 60, color: "bg-cyan-700" },
  ]

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
      if (nextCount >= settings.longBreakInterval) {
        setPomodoroCount(0)
        handleModeChange(timers[2])
      } else {
        setPomodoroCount(nextCount)
        handleModeChange(timers[1])
      }
    } else {
      handleModeChange(timers[0])
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

  return (
    <div
      className={`${activeMode.color} min-h-screen flex items-center justify-center transition-colors duration-500`}
    >
    {activeMode.title === "Pomodoro" && (
  <div className="absolute inset-x-0 top-5 px-20 flex justify-between items-center">
    
    <div className="text-white text-xl font-bold">Pomofocus</div>

    <button
      onClick={() => setShowSettings(true)}
      className="bg-white/10 text-white/50 px-4 py-2 rounded hover:bg-white/20 hover:text-white/80 transition"
    >
      ⚙️Settings
    </button>
  </div>
)}
      <Card className="w-140 rounded-2xl shadow-xl flex flex-col text-white relative">
       

        <div className={`${innerColors[activeMode.title]} rounded-2xl p-10 w-full`}>
          <CardHeader>
            <div className="flex gap-3 justify-center mb-4">
              {timers.map((mode) => (
                <button
                  key={mode.title}
                  className={`px-3 py-1 rounded font-semibold text-sm transition ${
                    activeMode.title === mode.title
                    ? "bg-transparent text-white/70"
 : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                  }`}
                  onClick={() => handleModeChange(mode)}
                >
                  {mode.title}
                </button>
              ))}
            </div>
            {/* <CardTitle className="text-center text-2xl font-bold">{activeMode.title}</CardTitle> */}
          </CardHeader>

          <CardContent className="flex flex-col items-center">
            <p className="text-[8rem] font-sans font-bold tabular-nums mb-6">{formatTime(secondsLeft)}</p>

            {!isRunning ? (
              <button
                onClick={toggleTimer}
                 className="bg-white text-black py-2 px-14 rounded font-semibold hover:bg-gray-200 transition"
              >
                START
              </button>
            ) : (
              <div className="flex gap-4 justify-center items-center mt-6">
                <button
                  onClick={toggleTimer}
                  className="bg-white text-black py-2 px-8 rounded font-semibold hover:bg-gray-200 transition"
  >
                  PAUSE
                </button>
                <button
                  onClick={handleNextStage}
                    className="text-white text-4xl hover:text-gray-300 transition"
                >
                   ▷
                </button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

     {showSettings && (
  <SettingsModal
    settings={settings}
    onSave={(newSettings) => {
      setSettings(newSettings)
      setShowSettings(false)
    }}
    onClose={() => setShowSettings(false)}
  />
)}
 
    </div>
  )
}

export default PomodoroTimer


