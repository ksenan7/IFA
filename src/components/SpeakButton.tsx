import React, { useState, useEffect, useCallback } from "react";
import { Volume2, Loader } from "lucide-react";
import { speakFrench, stopSpeech, isSpeechSupported } from "../utils/speechEngine";

interface SpeakButtonProps {
  nameFon: string;
  meaningFr?: string;
  variant?: "icon" | "pill";
  size?: "sm" | "md";
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  nameFon,
  meaningFr,
  variant = "icon",
  size = "md",
  className = "",
}) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!isSpeechSupported()) {
      setSupported(false);
    }
  }, []);

  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!supported) return;

      if (speaking) {
        stopSpeech();
        setSpeaking(false);
        return;
      }

      setSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(nameFon);
      const voices = window.speechSynthesis.getVoices();
      const hasYoruba = voices.some((v) => v.lang.startsWith("yo"));
      utterance.lang = hasYoruba ? "yo" : "fr-FR";
      utterance.rate = 0.75;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      utterance.onend = () => {
        if (meaningFr) {
          setTimeout(() => {
            speakFrench(meaningFr);
            const dur = (meaningFr.length * 80) / 0.85;
            setTimeout(() => setSpeaking(false), Math.min(dur, 8000));
          }, 300);
        } else {
          setSpeaking(false);
        }
      };

      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [nameFon, meaningFr, speaking, supported]
  );

  if (!supported) return null;

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  if (variant === "pill") {
    return (
      <button
        onClick={handleSpeak}
        title={speaking ? "Stopper la prononciation" : `Prononcer "${nameFon}" en Fon`}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95 ${
          speaking
            ? "bg-amber-500/20 border-amber-500 text-amber-300"
            : "bg-stone-900 border-stone-700 text-stone-300 hover:border-amber-700 hover:text-amber-300"
        } ${className}`}
      >
        {speaking ? (
          <Loader className={`${iconSize} animate-spin`} />
        ) : (
          <Volume2 className={iconSize} />
        )}
        {speaking ? "Lecture..." : "Écouter"}
      </button>
    );
  }

  return (
    <button
      onClick={handleSpeak}
      title={speaking ? "Stopper la prononciation" : `Prononcer "${nameFon}" en Fon`}
      className={`p-2 rounded-full border transition-all duration-200 active:scale-90 ${
        speaking
          ? "bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse"
          : "bg-stone-900 border-stone-800 text-stone-400 hover:border-amber-700 hover:text-amber-400"
      } ${className}`}
    >
      {speaking ? (
        <Loader className={`${iconSize} animate-spin`} />
      ) : (
        <Volume2 className={iconSize} />
      )}
    </button>
  );
};
