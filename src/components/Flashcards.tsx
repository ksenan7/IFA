import React, { useState, useEffect } from "react";
import { translations, type Language } from "../utils/translations";
import { type FaSign } from "../utils/faEngine";
import { FaSignRepresentation } from "./FaSignRepresentation";
import { SpeakButton } from "./SpeakButton";
import { ShareButton } from "./ShareButton";
import { getSRSProgress, evaluateCard } from "../utils/srsEngine";
import { CheckCircle2, RotateCcw, BookOpen } from "lucide-react";

interface FlashcardsProps {
  lang: Language;
  allSigns: FaSign[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ lang, allSigns }) => {
  const t = translations[lang];
  const [dueCards, setDueCards] = useState<FaSign[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isReviewingAll, setIsReviewingAll] = useState(false);

  // Load due cards
  const loadCards = () => {
    const progress = getSRSProgress();
    const now = Date.now();

    // Due cards: nextReviewDate in the past
    let due = allSigns.filter((sign) => {
      const cardProgress = progress[sign.id];
      return cardProgress && cardProgress.nextReviewDate <= now;
    });

    // If no cards are due, we can introduce up to 5 new cards that haven't been studied yet (no progress data)
    if (due.length === 0 && !isReviewingAll) {
      const unstudied = allSigns.filter((sign) => !progress[sign.id]);
      // Limit to 5 mother signs first, or any if mother signs are already studied
      const unstudiedMothers = unstudied.filter((s) => s.isMother);
      const candidates = unstudiedMothers.length > 0 ? unstudiedMothers : unstudied;
      due = candidates.slice(0, 5);
    }

    setDueCards(due);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  useEffect(() => {
    loadCards();
  }, [isReviewingAll]);

  const handleScore = (score: number) => {
    if (dueCards.length === 0) return;
    const card = dueCards[currentCardIndex];
    evaluateCard(card.id, score);

    // Go to next card
    if (currentCardIndex + 1 < dueCards.length) {
      setCurrentCardIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      // Re-evaluate queue
      loadCards();
    }
  };

  const handleReviewAll = () => {
    setIsReviewingAll(true);
    // Shuffle all mother signs for an active review
    const shuffled = [...allSigns.filter((s) => s.isMother)].sort(() => Math.random() - 0.5);
    setDueCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const currentCard = dueCards[currentCardIndex];

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-amber-200 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          {t.flashcards}
        </h2>
        <p className="text-sm text-stone-400">{t.flashcardInstructions}</p>
      </div>

      {currentCard ? (
        <div className="bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-xl">
          {/* Card Progress Indicator */}
          <div className="w-full flex justify-between items-center text-xs text-stone-400">
            <span>
              Carte {currentCardIndex + 1} sur {dueCards.length}
            </span>
            {currentCard.isMother ? (
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-900 font-semibold uppercase text-[9px]">
                Mère (Duno)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-semibold uppercase text-[9px]">
                Dérivé
              </span>
            )}
          </div>

          {/* Graphic representation */}
          <div className="my-4 animate-scale-in">
            <FaSignRepresentation
              patternLeft={currentCard.patternLeft}
              patternRight={currentCard.patternRight}
              size="lg"
            />
          </div>

          {/* Hidden/Revealed Section */}
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-[0.98] transition duration-200"
            >
              {t.revealAnswer}
            </button>
          ) : (
            <div className="w-full space-y-5 animate-slide-up border-t border-stone-800 pt-5">
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-amber-400">{currentCard.nameFon}</h3>
                <p className="text-stone-400 text-xs italic">Yoruba: {currentCard.nameYoruba}</p>
                <p className="text-stone-400 text-sm">Français: {currentCard.nameFrench}</p>
                {/* Audio & Share actions */}
                <div className="flex justify-center gap-2 pt-2">
                  <SpeakButton nameFon={currentCard.nameFon} meaningFr={currentCard.meaningFr} variant="pill" size="sm" />
                  <ShareButton sign={currentCard} lang={lang} variant="pill" size="sm" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-850 text-xs">
                  <span className="font-bold text-amber-500 block mb-1">{t.vodoun}</span>
                  <span className="text-stone-200 font-semibold">{currentCard.vodounName}</span>
                  <p className="text-stone-400 mt-1">
                    {lang === "fon" ? currentCard.vodounDescFon : currentCard.vodounDescFr}
                  </p>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-amber-500 block mb-1">{t.meaning}</span>
                  <p className="text-stone-200 leading-relaxed">
                    {lang === "fon" ? currentCard.meaningFon : currentCard.meaningFr}
                  </p>
                </div>
              </div>

              {/* SM-2 Button score selection */}
              <div className="space-y-2.5 pt-2">
                <p className="text-center text-xs text-amber-300 font-bold">{t.scoreQuestion}</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleScore(1)}
                    className="bg-red-950/60 hover:bg-red-900/60 border border-red-800 text-red-300 font-semibold py-2 px-1 text-xs rounded-xl active:scale-[0.97] transition"
                  >
                    {t.again}
                  </button>
                  <button
                    onClick={() => handleScore(3)}
                    className="bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 font-semibold py-2 px-1 text-xs rounded-xl active:scale-[0.97] transition"
                  >
                    {t.hard}
                  </button>
                  <button
                    onClick={() => handleScore(4)}
                    className="bg-amber-950/40 hover:bg-amber-900/40 border border-amber-900/70 text-amber-300 font-semibold py-2 px-1 text-xs rounded-xl active:scale-[0.97] transition"
                  >
                    {t.good}
                  </button>
                  <button
                    onClick={() => handleScore(5)}
                    className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-300 font-semibold py-2 px-1 text-xs rounded-xl active:scale-[0.97] transition"
                  >
                    {t.easy}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-8 text-center space-y-6 flex flex-col items-center shadow-lg">
          <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full w-max">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-stone-200">{t.noCardsDue}</h3>
            <p className="text-sm text-stone-400">
              Votre mémoire est à jour. Continuez à pratiquer régulièrement pour maintenir votre maîtrise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleReviewAll}
              className="flex-1 bg-stone-900 hover:bg-stone-850 border border-stone-800 text-amber-400 font-bold py-3 px-5 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Réviser les 16 mères
            </button>
            <button
              onClick={() => setIsReviewingAll(false)}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold py-3 px-5 rounded-2xl active:scale-[0.98] transition"
            >
              {t.studyMore}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
