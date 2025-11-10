import Settings from "./Settings"
import type { SettingsType } from "./Settings"

type SettingsModalProps = {
  settings: SettingsType
  onSave: (newSettings: SettingsType) => void
  onClose: () => void
}

const SettingsModal = ({ settings, onSave, onClose }: SettingsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-4 rounded-2xl shadow-lg">
        <Settings settings={settings} onSave={onSave} onClose={onClose} />
      </div>
    </div>
  )
}

export default SettingsModal