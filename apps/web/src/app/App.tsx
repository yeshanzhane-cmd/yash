import { useState } from "react";
import { MicButton } from "../features/voice-assistant/components/MicButton";
import { SettingsPanel } from "../features/voice-assistant/components/SettingsPanel";
import { Toast } from "../features/voice-assistant/components/Toast";
import { TranscriptPanel } from "../features/voice-assistant/components/TranscriptPanel";
import { VoiceOrb } from "../features/voice-assistant/components/VoiceOrb";
import { useConversation } from "../features/voice-assistant/hooks/useConversation";
import "./App.css";

export function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const {
    orbState,
    history,
    interimTranscript,
    errorMessage,
    dismissError,
    isMicSupported,
    isTtsSupported,
    isMuted,
    toggleMute,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    toggleListening,
    clearHistory,
    sendTextMessage
  } = useConversation();

  const isListening = orbState === "listening";
  const isBusy = orbState === "thinking" || orbState === "speaking";

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-wordmark">ALPHA X</span>
        <button
          type="button"
          className="app-settings-trigger"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
        >
          ⚙
        </button>
      </header>

      <main className="app-main">
        <VoiceOrb state={orbState} />

        <div className="app-controls">
          {isMicSupported ? (
            <MicButton isListening={isListening} disabled={isBusy && !isListening} onClick={toggleListening} />
          ) : (
            <form
              className="app-text-fallback"
              onSubmit={(e) => {
                e.preventDefault();
                sendTextMessage(textInput);
                setTextInput("");
              }}
            >
              <input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Speech recognition isn't supported here — type instead"
                disabled={isBusy}
              />
              <button type="submit" disabled={isBusy || textInput.trim().length === 0}>
                Send
              </button>
            </form>
          )}
        </div>

        <TranscriptPanel history={history} interimTranscript={interimTranscript} />

        {!isTtsSupported && (
          <p className="app-hint">Text-to-speech isn't supported in this browser — replies will appear as text only.</p>
        )}
      </main>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        voices={voices}
        selectedVoiceURI={selectedVoiceURI}
        onSelectVoice={setSelectedVoiceURI}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onClearHistory={clearHistory}
      />

      {errorMessage && <Toast message={errorMessage} onDismiss={dismissError} />}
    </div>
  );
}
