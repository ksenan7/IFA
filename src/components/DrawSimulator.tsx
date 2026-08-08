import React, { useState } from "react";
import { translations, type Language } from "../utils/translations";
import { type FaSign, findSignByPattern } from "../utils/faEngine";
import { FaSignRepresentation } from "./FaSignRepresentation";
import { SpeakButton } from "./SpeakButton";
import { ShareButton } from "./ShareButton";
import { Compass, RotateCcw, Eye } from "lucide-react";

interface DrawSimulatorProps {
  lang: Language;
  allSigns: FaSign[];
}

export const DrawSimulator: React.FC<DrawSimulatorProps> = ({ lang, allSigns }) => {
  const t = translations[lang];

  // Pattern state: 1 for single stroke, 2 for double stroke
  // Top-to-bottom order for Level 0 to 3
  const [patternLeft, setPatternLeft] = useState<[number, number, number, number]>([1, 1, 1, 1]);
  const [patternRight, setPatternRight] = useState<[number, number, number, number]>([1, 1, 1, 1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Active sign based on pattern
  const activeSign = findSignByPattern(patternLeft, patternRight, allSigns);

  // Throw Agoumagan (Randomized)
  const throwAgoumagan = () => {
    setIsAnimating(true);
    setHasDrawn(false);
    setShowDetail(false);

    // Simulate physics delay for immersion
    setTimeout(() => {
      const newLeft = Array.from({ length: 4 }, () => (Math.random() > 0.5 ? 1 : 2)) as [
        number,
        number,
        number,
        number
      ];
      const newRight = Array.from({ length: 4 }, () => (Math.random() > 0.5 ? 1 : 2)) as [
        number,
        number,
        number,
        number
      ];

      setPatternLeft(newLeft);
      setPatternRight(newRight);
      setIsAnimating(false);
      setHasDrawn(true);
    }, 1000);
  };

  // Modify individual cells manually
  const toggleCell = (side: "left" | "right", index: number) => {
    setHasDrawn(true);
    if (side === "left") {
      const newPattern = [...patternLeft] as [number, number, number, number];
      newPattern[index] = newPattern[index] === 1 ? 2 : 1;
      setPatternLeft(newPattern);
    } else {
      const newPattern = [...patternRight] as [number, number, number, number];
      newPattern[index] = newPattern[index] === 1 ? 2 : 1;
      setPatternRight(newPattern);
    }
  };

  const resetTirage = () => {
    setPatternLeft([1, 1, 1, 1]);
    setPatternRight([1, 1, 1, 1]);
    setHasDrawn(false);
    setShowDetail(false);
  };

  // Simplified visual seed pod depiction
  const renderPod = (side: "left" | "right", index: number) => {
    const val = side === "left" ? patternLeft[index] : patternRight[index];
    const isOpen = val === 1;

    return (
      <div
        key={index}
        onClick={() => toggleCell(side, index)}
        className="cursor-pointer group flex flex-col items-center gap-1 active:scale-95 transition"
      >
        <div
          className={`w-10 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${
            isOpen
              ? "bg-amber-600/40 border-amber-500 shadow-amber-500/20"
              : "bg-stone-900 border-stone-700 shadow-inner"
          }`}
          style={{
            boxShadow: isOpen ? "0 0 15px rgba(245, 158, 11, 0.3)" : "none",
          }}
        >
          {/* Internal Seed look */}
          <div
            className={`w-3.5 h-7 rounded-full transition-all duration-300 ${
              isOpen ? "bg-amber-300 scale-y-110" : "bg-stone-600 scale-y-75 w-2"
            }`}
          />
        </div>
        <span className="text-[10px] text-stone-500 group-hover:text-stone-300 transition-colors uppercase font-bold">
          {isOpen ? "I" : "II"}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-amber-200 flex items-center justify-center gap-2">
          <Compass className="w-6 h-6 text-amber-400 animate-spin-slow" />
          {t.draw}
        </h2>
        <p className="text-sm text-stone-400">{t.drawInstructions}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-6 shadow-xl">
        {/* Left Side: Agoumagan Visualization */}
        <div className="flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-850 pb-6 md:pb-0 md:pr-6 gap-6">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">
            Agoumagan (Chapelet)
          </span>

          <div className="flex gap-10 select-none relative py-4">
            {/* Thread top loop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-stone-700 rounded-full" />
            <div className="absolute top-6 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-stone-700" />

            {/* Left Column (strand) */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, idx) => renderPod("left", idx))}
            </div>

            {/* Right Column (strand) */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, idx) => renderPod("right", idx))}
            </div>
          </div>

          <div className="flex gap-2.5 w-full">
            <button
              onClick={resetTirage}
              disabled={isAnimating}
              className="bg-stone-950 hover:bg-stone-900 border border-stone-850 text-stone-400 p-3 rounded-2xl transition disabled:opacity-50"
              title={t.drawReset}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={throwAgoumagan}
              disabled={isAnimating}
              className={`flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold py-3 px-5 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 ${
                isAnimating ? "animate-pulse" : ""
              }`}
            >
              <Compass className={`w-5 h-5 ${isAnimating ? "animate-spin" : ""}`} />
              {isAnimating ? "Lancement..." : t.drawButton}
            </button>
          </div>
        </div>

        {/* Right Side: Sign Identification & Interpretation */}
        <div className="flex flex-col items-center justify-center p-2 min-h-[300px]">
          {isAnimating ? (
            <div className="flex flex-col items-center gap-4 text-center animate-pulse">
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-4 border-amber-600/30 border-t-amber-500 animate-spin" />
              <p className="text-sm font-semibold text-amber-500 tracking-wider">
                Le Fa consulte les puissances terrestres...
              </p>
            </div>
          ) : hasDrawn && activeSign ? (
            <div className="w-full text-center space-y-5 animate-scale-in">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                {t.drawResult}
              </span>

              {/* Opon representation of result */}
              <div className="flex justify-center">
                <FaSignRepresentation
                  patternLeft={activeSign.patternLeft}
                  patternRight={activeSign.patternRight}
                  size="md"
                />
              </div>

              <div>
                <div className="flex justify-center items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-amber-400">
                    {activeSign.nameFon}
                  </h3>
                  {activeSign.isMother && (
                    <span className="px-2 py-0.5 rounded text-[8px] bg-red-950 text-red-400 border border-red-900 font-bold uppercase">
                      Mère
                    </span>
                  )}
                </div>
                <p className="text-stone-400 text-xs italic">Yoruba: {activeSign.nameYoruba}</p>
                <p className="text-stone-400 text-xs">Français: {activeSign.nameFrench}</p>
                {/* Audio + Share */}
                <div className="flex justify-center gap-2 pt-2">
                  <SpeakButton nameFon={activeSign.nameFon} meaningFr={activeSign.meaningFr} variant="pill" size="sm" />
                  <ShareButton sign={activeSign} lang={lang} variant="pill" size="sm" />
                </div>
              </div>

              {/* Quick details */}
              <div className="text-left bg-stone-950/60 p-4 rounded-2xl border border-stone-850 space-y-2">
                <div>
                  <span className="text-[10px] text-amber-500 font-bold uppercase block">
                    {t.vodoun}
                  </span>
                  <span className="text-xs text-stone-200 font-semibold">
                    {activeSign.vodounName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-500 font-bold uppercase block">
                    {t.meaning}
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed truncate">
                    {lang === "fon" ? activeSign.meaningFon : activeSign.meaningFr}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetail(true)}
                className="w-full bg-stone-900 hover:bg-stone-850 border border-stone-800 text-amber-400 py-3 rounded-2xl transition flex items-center justify-center gap-2 text-sm font-semibold active:scale-[0.98]"
              >
                <Eye className="w-4 h-4" />
                Interprétation complète
              </button>
            </div>
          ) : (
            <div className="text-center space-y-3 max-w-[280px]">
              <Compass className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-sm font-medium text-stone-300">Aucun tirage actif</p>
              <p className="text-xs text-stone-500 leading-relaxed">
                Utilisez le bouton de lancement automatique ou modifiez manuellement le chapelet en cliquant sur les graines.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Overlay */}
      {showDetail && activeSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-950 border border-amber-900/40 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 p-2 bg-stone-900 hover:bg-stone-850 rounded-full border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5 rotate-45" />
            </button>

            <div className="flex flex-col items-center gap-6 mt-4">
              <FaSignRepresentation
                patternLeft={activeSign.patternLeft}
                patternRight={activeSign.patternRight}
                size="md"
              />

              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-amber-400">{activeSign.nameFon}</h3>
                <p className="text-stone-400 text-xs italic">Yoruba: {activeSign.nameYoruba}</p>
                <p className="text-stone-400 text-sm">Français: {activeSign.nameFrench}</p>
                {/* Audio + Share in detail overlay */}
                <div className="flex justify-center gap-2 pt-3">
                  <SpeakButton nameFon={activeSign.nameFon} meaningFr={activeSign.meaningFr} variant="pill" />
                  <ShareButton sign={activeSign} lang={lang} variant="pill" />
                </div>
              </div>

              <div className="w-full space-y-4 text-left border-t border-stone-900 pt-6">
                <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-850 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                    {t.vodoun}
                  </h4>
                  <p className="font-bold text-stone-100">{activeSign.vodounName}</p>
                  <p className="text-xs text-stone-400">
                    {lang === "fon" ? activeSign.vodounDescFon : activeSign.vodounDescFr}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                    {t.meaning}
                  </h4>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {lang === "fon" ? activeSign.meaningFon : activeSign.meaningFr}
                  </p>
                </div>

                {activeSign.proverbsFr && activeSign.proverbsFr.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                      {t.proverbs}
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-stone-400 text-xs italic">
                      {(lang === "fon" ? activeSign.proverbsFon : activeSign.proverbsFr).map(
                        (proverb, idx) => (
                          <li key={idx}>"{proverb}"</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
