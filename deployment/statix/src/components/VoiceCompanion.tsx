import { useCallback, useEffect, useRef, useState } from "react";

type VoiceState = "idle" | "listening" | "speaking";

interface VoiceCompanionProps {
  message: string;
  onTranscript?: (text: string) => void;
  autoSpeak?: boolean;
  agentName?: string;
}

export default function VoiceCompanion({
  message,
  onTranscript,
  autoSpeak = true,
  agentName = "Soul",
}: VoiceCompanionProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [supported, setSupported] = useState({ tts: false, stt: false });
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const spokenRef = useRef("");

  useEffect(() => {
    setSupported({
      tts: "speechSynthesis" in window,
      stt: "SpeechRecognition" in window || "webkitSpeechRecognition" in window,
    });
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) ?? voices[0];
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setVoiceState("speaking");
    utter.onend = () => setVoiceState("idle");
    window.speechSynthesis.speak(utter);
  }, []);

  useEffect(() => {
    if (!autoSpeak || !message || message === spokenRef.current) return;
    spokenRef.current = message;
    const t = setTimeout(() => speak(message), 400);
    return () => clearTimeout(t);
  }, [message, autoSpeak, speak]);

  function startListening() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-ZA";
    rec.onstart = () => setVoiceState("listening");
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[0]?.[0]?.transcript ?? "";
      onTranscript?.(text);
      setVoiceState("idle");
    };
    rec.onerror = () => setVoiceState("idle");
    rec.onend = () => setVoiceState("idle");
    recognitionRef.current = rec;
    rec.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setVoiceState("idle");
  }

  return (
    <div className="voice-companion">
      {message && <div className="voice-bubble">{message}</div>}
      <div className={`voice-face ${voiceState}`} title={`${agentName} agent`}>
        {voiceState === "listening" ? "👂" : voiceState === "speaking" ? "🗣️" : "✦"}
      </div>
      <div className="voice-controls">
        {supported.tts && (
          <button type="button" className="voice-btn" onClick={() => speak(message)}>
            Replay
          </button>
        )}
        {supported.stt && onTranscript && (
          <button
            type="button"
            className={`voice-btn ${voiceState === "listening" ? "active" : ""}`}
            onClick={voiceState === "listening" ? stopListening : startListening}
          >
            {voiceState === "listening" ? "Stop" : "Speak"}
          </button>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
