import "./SettingsPanel.css";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string | undefined;
  onSelectVoice: (uri: string | undefined) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onClearHistory: () => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  voices,
  selectedVoiceURI,
  onSelectVoice,
  isMuted,
  onToggleMute,
  onClearHistory
}: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <span>SETTINGS</span>
          <button type="button" className="settings-close" onClick={onClose} aria-label="Close settings">
            ×
          </button>
        </div>

        <label className="settings-field">
          <span>Voice</span>
          <select
            value={selectedVoiceURI ?? ""}
            onChange={(e) => onSelectVoice(e.target.value || undefined)}
          >
            <option value="">System default</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>

        <label className="settings-field settings-field--row">
          <span>Mute responses</span>
          <input type="checkbox" checked={isMuted} onChange={onToggleMute} />
        </label>

        <button type="button" className="settings-danger" onClick={onClearHistory}>
          Clear conversation
        </button>
      </div>
    </div>
  );
}
