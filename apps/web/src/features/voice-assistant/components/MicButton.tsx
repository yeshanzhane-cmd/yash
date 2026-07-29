import "./MicButton.css";

interface MicButtonProps {
  isListening: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function MicButton({ isListening, disabled, onClick }: MicButtonProps) {
  return (
    <button
      type="button"
      className="mic-button"
      data-active={isListening}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={isListening}
      aria-label={isListening ? "Stop listening" : "Start talking to Alpha X"}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z"
        />
      </svg>
    </button>
  );
}
