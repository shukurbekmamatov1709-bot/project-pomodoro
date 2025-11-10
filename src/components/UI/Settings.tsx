

import { useState } from "react"
import { Card } from "./Card"
import { CardHeader } from "./CardHeader"
import { CardTitle } from "./CardTitle"
import { CardContent } from "./CardContent"

// отдельный тип для настроек
export type SettingsType = {
  pomodoro: number
  shortBreak: number
  longBreak: number
  autoStartPomodoros: boolean
  autoStartBreaks: boolean
  longBreakInterval: number
}

// пропсы компонента
type SettingsProps = {
  settings: SettingsType
  onSave: (newSettings: SettingsType) => void
  onClose: () => void
}

const Settings = ({ settings, onSave, onClose }: SettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (key: keyof typeof localSettings, value: string | boolean | number) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    onSave(localSettings)
  }

  return (
    
    <Card className="w-[360px] p-6 rounded-2xl shadow-lg bg-white text-black">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold mb-2">Настройки</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Pomodoro (мин)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={localSettings.pomodoro}
            onChange={(e) => handleChange("pomodoro", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Short Break (мин)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={localSettings.shortBreak}
            onChange={(e) => handleChange("shortBreak", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Long Break (мин)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={localSettings.longBreak}
            onChange={(e) => handleChange("longBreak", Number(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Auto start Pomodoros</span>
          <button
            onClick={() =>
              handleChange("autoStartPomodoros", !localSettings.autoStartPomodoros)
            }
            className={`w-12 h-6 rounded-full p-1 transition ${
              localSettings.autoStartPomodoros ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                localSettings.autoStartPomodoros ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>Auto start Breaks</span>
          <button
            onClick={() =>
              handleChange("autoStartBreaks", !localSettings.autoStartBreaks)
            }
            className={`w-12 h-6 rounded-full p-1 transition ${
              localSettings.autoStartBreaks ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                localSettings.autoStartBreaks ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">Long Break Interval</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={localSettings.longBreakInterval}
            onChange={(e) =>
              handleChange("longBreakInterval", Number(e.target.value))
            }
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Сохранить настройки
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-400 text-white py-2 rounded-lg mt-2 hover:bg-gray-500 transition"
        >
          Назад
        </button>
      </CardContent>
    </Card>
  )
}

export default Settings