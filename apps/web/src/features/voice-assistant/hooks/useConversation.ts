import { useCallback, useRef, useState } from "react";
import { ChatApiError, sendChatMessage } from "../services/chatApi";
import type { ConversationTurn, OrbState } from "../types";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useSpeechSynthesis } from "./useSpeechSynthesis";

interface UseConversationResult {
  orbState: OrbState;
  history: ConversationTurn[];
  interimTranscript: string;
  errorMessage: string | null;
  dismissError: () => void;
  isMicSupported: boolean;
  isTtsSupported: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string | undefined;
  setSelectedVoiceURI: (uri: string | undefined) => void;
  toggleListening: () => void;
  clearHistory: () => void;
  sendTextMessage: (text: string) => void;
}

const SPEECH_ERROR_MESSAGES: Record<string, string> = {
  "not-allowed": "Microphone access was denied. Enable it in your browser settings to talk to Alpha X.",
  "no-speech": "I didn't catch that — try again.",
  network: "Speech recognition lost its network connection."
};

export function useConversation(): UseConversationResult {
  const [history, setHistory] = useState<ConversationTurn[]>([]);
  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>(undefined);

  // Mirrors `history` state so the async turn handler always sends the
  // latest conversation without needing to depend on (and re-create the
  // callback on) every history change.
  const historyRef = useRef<ConversationTurn[]>([]);
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  const { isSpeaking, voices, speak, cancel: cancelSpeech } = useSpeechSynthesis();

  const runTurn = useCallback(
    async (userText: string) => {
      const userTurn: ConversationTurn = { role: "user", text: userText };
      historyRef.current = [...historyRef.current, userTurn];
      setHistory(historyRef.current);
      setOrbState("thinking");

      try {
        const reply = await sendChatMessage(userText, historyRef.current.slice(0, -1));
        const assistantTurn: ConversationTurn = { role: "assistant", text: reply };
        historyRef.current = [...historyRef.current, assistantTurn];
        setHistory(historyRef.current);

        setOrbState("idle");
        if (!isMutedRef.current) {
          // isSpeaking (from useSpeechSynthesis) drives the "speaking"
          // visual for as long as playback actually runs.
          speak(reply, selectedVoiceURI);
        }
      } catch (err) {
        setErrorMessage(
          err instanceof ChatApiError ? err.message : "Something went wrong reaching Alpha X."
        );
        setOrbState("idle");
      }
    },
    [speak, selectedVoiceURI]
  );

  const {
    isSupported: isMicSupported,
    isListening,
    interimTranscript,
    start: startListening,
    stop: stopListening
  } = useSpeechRecognition({
    onFinalTranscript: (text) => {
      if (text.length > 0) void runTurn(text);
      else setOrbState("idle");
    },
    onError: (code) => {
      setErrorMessage(SPEECH_ERROR_MESSAGES[code] ?? `Speech recognition error: ${code}`);
      setOrbState("idle");
    }
  });

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }
    cancelSpeech();
    setErrorMessage(null);
    setOrbState("listening");
    startListening();
  }, [isListening, startListening, stopListening, cancelSpeech]);

  const sendTextMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (trimmed.length === 0) return;
      void runTurn(trimmed);
    },
    [runTurn]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) cancelSpeech();
      return !prev;
    });
  }, [cancelSpeech]);

  const clearHistory = useCallback(() => {
    historyRef.current = [];
    setHistory([]);
  }, []);

  const dismissError = useCallback(() => setErrorMessage(null), []);

  // Reconcile orb state with what's actually happening: live mic/speech
  // signals win over the app-driven state, which only ever holds "thinking"
  // (set for the duration of the pending Claude request) or "idle".
  const resolvedOrbState: OrbState = isListening
    ? "listening"
    : isSpeaking
      ? "speaking"
      : orbState;

  return {
    orbState: resolvedOrbState,
    history,
    interimTranscript,
    errorMessage,
    dismissError,
    isMicSupported,
    isTtsSupported: typeof window !== "undefined" && "speechSynthesis" in window,
    isMuted,
    toggleMute,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    toggleListening,
    clearHistory,
    sendTextMessage
  };
}
