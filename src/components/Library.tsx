import React, { useState } from "react";
import { translations, type Language } from "../utils/translations";
import { type FaSign } from "../utils/faEngine";
import { FaSignRepresentation } from "./FaSignRepresentation";
import { SpeakButton } from "./SpeakButton";
import { ShareButton } from "./ShareButton";
import { Search, X, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface LibraryProps {
  lang: Language;
  allSigns: FaSign[];
}

export const Library: React.FC<LibraryProps> = ({ lang, allSigns }) => {
  const t = translations[lang];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "mothers" | "derived">("all");
  const [selectedSign, setSelectedSign] = useState<FaSign | null>(null);

  // Filter list
  const filteredSigns = allSigns.filter((sign) => {
    // Search match
    const searchLower = search.toLowerCase();
    const matchesSearch =
      sign.nameFon.toLowerCase().includes(searchLower) ||
      sign.nameYoruba.toLowerCase().includes(searchLower) ||
      sign.nameFrench.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Filter match
    if (filter === "mothers") return sign.isMother;
    if (filter === "derived") return !sign.isMother;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Stats summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-amber-200 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            {t.library}
          </h2>
          <p className="text-sm text-stone-400">
            {filteredSigns.length} / {allSigns.length} wema (signes)
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-stone-800 self-start">
          {(["all", "mothers", "derived"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === type
                  ? "bg-amber-500 text-stone-950 font-bold shadow"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {type === "all" ? t.filterAll : type === "mothers" ? t.filterMothers : t.filterDerived}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-stone-900/50 backdrop-blur border border-stone-800 rounded-2xl py-3.5 pl-11 pr-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sign Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSigns.map((sign) => (
          <div
            key={sign.id}
            onClick={() => setSelectedSign(sign)}
            className="group cursor-pointer bg-stone-900/30 hover:bg-stone-900/80 border border-stone-850 hover:border-amber-900/40 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-300 shadow hover:shadow-lg hover:shadow-black active:scale-[0.98]"
          >
            <FaSignRepresentation
              patternLeft={sign.patternLeft}
              patternRight={sign.patternRight}
              size="sm"
            />
            <div className="text-center w-full">
              <p className="text-sm font-bold text-amber-100 group-hover:text-amber-400 transition-colors truncate">
                {lang === "fon" ? sign.nameFon : sign.nameFrench}
              </p>
              <p className="text-[10px] text-stone-500 italic truncate">{sign.nameYoruba}</p>
              {sign.isMother && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] bg-red-950 text-red-400 border border-red-900/55 font-semibold">
                  Mère (Duno)
                </span>
              )}
            </div>
            {/* Quick actions on hover */}
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
              <SpeakButton nameFon={sign.nameFon} size="sm" />
              <ShareButton sign={sign} lang={lang} variant="icon" size="sm" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Drawer */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-950 border border-amber-900/40 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black">
            {/* Close button */}
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 p-2 bg-stone-900 hover:bg-stone-850 rounded-full border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-6 mt-4">
              <FaSignRepresentation
                patternLeft={selectedSign.patternLeft}
                patternRight={selectedSign.patternRight}
                size="md"
              />

              <div className="text-center space-y-1">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-extrabold text-amber-400">
                    {selectedSign.nameFon}
                  </h3>
                  {selectedSign.isMother && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-red-950 text-red-400 border border-red-900 font-bold uppercase tracking-wider">
                      Duno (Mère)
                    </span>
                  )}
                </div>
                <p className="text-stone-400 text-sm">
                  Yoruba: <span className="font-semibold italic">{selectedSign.nameYoruba}</span>
                </p>
                <p className="text-stone-400 text-sm">
                  Français: <span className="font-semibold">{selectedSign.nameFrench}</span>
                </p>
                {/* Audio + Share actions */}
                <div className="flex justify-center gap-2 pt-2">
                  <SpeakButton
                    nameFon={selectedSign.nameFon}
                    meaningFr={selectedSign.meaningFr}
                    variant="pill"
                  />
                  <ShareButton sign={selectedSign} lang={lang} variant="pill" />
                </div>
              </div>

              {/* Tabs / Info Sections */}
              <div className="w-full space-y-4 text-left border-t border-stone-900 pt-6">
                {/* Vodoun details */}
                <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-850 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    {t.vodoun}
                  </h4>
                  <p className="font-bold text-stone-100">{selectedSign.vodounName}</p>
                  <p className="text-xs text-stone-400">
                    {lang === "fon" ? selectedSign.vodounDescFon : selectedSign.vodounDescFr}
                  </p>
                </div>

                {/* Meaning details */}
                <div className="space-y-1.5">
                  <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    {t.meaning}
                  </h4>
                  <p className="text-stone-200 leading-relaxed text-sm">
                    {lang === "fon" ? selectedSign.meaningFon : selectedSign.meaningFr}
                  </p>
                </div>

                {/* Proverbs details */}
                {selectedSign.proverbsFr && selectedSign.proverbsFr.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                      {t.proverbs}
                    </h4>
                    <ul className="list-disc pl-4 space-y-1.5 text-stone-400 text-sm italic">
                      {(lang === "fon" ? selectedSign.proverbsFon : selectedSign.proverbsFr).map(
                        (proverb, idx) => (
                          <li key={idx} className="leading-snug">
                            "{proverb}"
                          </li>
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
