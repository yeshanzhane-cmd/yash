import { useEffect, useRef, useState } from "react";
import type { ConversationTurn } from "../types";
import "./TranscriptPanel.css";

interface TranscriptPanelProps {
  history: ConversationTurn[];
  interimTranscript: string;
}

export function TranscriptPanel({ history, interimTranscript }: TranscriptPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [history, interimTranscript, isOpen]);

  return (
    <div className="transcript-panel" data-open={isOpen}>
      <button
        type="button"
        className="transcript-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {isOpen ? "▾" : "▸"} transcript {history.length > 0 && `(${history.length})`}
      </button>

      {isOpen && (
        <div className="transcript-log" ref={logRef}>
          {history.length === 0 && !interimTranscript && (
            <p className="transcript-empty">// no conversation yet</p>
          )}
          {history.map((turn, index) => (
            <p key={index} className={`transcript-line transcript-line--${turn.role}`}>
              <span className="transcript-prefix">
                {turn.role === "user" ? "YOU:" : "ALPHA X:"}
              </span>{" "}
              {turn.text}
            </p>
          ))}
          {interimTranscript && (
            <p className="transcript-line transcript-line--interim">
              <span className="transcript-prefix">YOU:</span> {interimTranscript}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
