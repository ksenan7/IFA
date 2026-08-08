/**
 * speechEngine.ts
 * Web Speech API wrapper for pronouncing Fon sign names.
 * Uses the browser's built-in SpeechSynthesis with Fon/Yoruba language hints.
 */

export interface SpeechOptions {
  lang?: string;       // BCP 47 language tag (e.g. "fr-FR", "yo", "en-US")
  rate?: number;       // Speech rate 0.1–10 (default 0.85 for clarity)
  pitch?: number;      // Pitch 0–2 (default 1.0)
  volume?: number;     // Volume 0–1 (default 1.0)
}

export function isSpeechSupported(): boolean {
  return "speechSynthesis" in window;
}

/**
 * Speak text using the Web Speech API.
 * Falls back gracefully if TTS is unsupported.
 */
export function speak(text: string, options: SpeechOptions = {}): void {
  if (!isSpeechSupported()) return;

  // Stop any currently playing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang ?? "fr-FR";
  utterance.rate = options.rate ?? 0.8;
  utterance.pitch = options.pitch ?? 1.0;
  utterance.volume = options.volume ?? 1.0;

  // Try to find a voice matching the language
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const exactMatch = voices.find((v) => v.lang.startsWith(options.lang?.split("-")[0] ?? "fr"));
    if (exactMatch) {
      utterance.voice = exactMatch;
    }
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stop all currently playing speech.
 */
export function stopSpeech(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}

/**
 * Speak a Fon sign name phonetically.
 */
export function speakFonName(nameFon: string): void {
  const voices = window.speechSynthesis.getVoices();
  const hasYoruba = voices.some((v) => v.lang.startsWith("yo"));

  speak(nameFon, {
    lang: hasYoruba ? "yo" : "fr-FR",
    rate: 0.75,
    pitch: 1.05,
  });
}

/**
 * Speak a French sentence.
 */
export function speakFrench(text: string): void {
  speak(text, { lang: "fr-FR", rate: 0.85 });
}
