import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionOptions {
  onFinalTranscript: (text: string) => void;
  onError?: (message: string) => void;
}

interface UseSpeechRecognitionResult {
  isSupported: boolean;
  isListening: boolean;
  interimTranscript: string;
  start: () => void;
  stop: () => void;
}

// Thin wrapper around the browser's SpeechRecognition API. Callbacks are
// held in refs so the recognition instance is created once, not recreated
// every time a parent re-renders with new inline callbacks.
export function useSpeechRecognition({
  onFinalTranscript,
  onError
}: UseSpeechRecognitionOptions): UseSpeechRecognitionResult {
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  const onErrorRef = useRef(onError);
  onFinalTranscriptRef.current = onFinalTranscript;
  onErrorRef.current = onError;

  const RecognitionCtor =
    typeof window !== "undefined"
      ? window.SpeechRecognition ?? window.webkitSpeechRecognition
      : undefined;
  const isSupported = Boolean(RecognitionCtor);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    if (!RecognitionCtor) return undefined;

    const recognition = new RecognitionCtor();
    recognition.lang = "en-US";
    // Non-continuous: the browser auto-stops after one utterance (on a
    // detected pause), which maps naturally to "tap to talk, speak, done".
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) {
          onFinalTranscriptRef.current(result[0].transcript.trim());
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      onErrorRef.current?.(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
    // RecognitionCtor is stable across the component's lifetime — only
    // set up the recognition instance once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch {
      // start() throws if already started; state stays consistent via onend.
      setIsListening(false);
    }
  }, [isListening]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { isSupported, isListening, interimTranscript, start, stop };
}
