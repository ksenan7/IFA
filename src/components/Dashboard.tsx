import React from "react";
import { translations, type Language } from "../utils/translations";
import { type FaSign } from "../utils/faEngine";
import { getSRSProgress } from "../utils/srsEngine";
import { BookOpen, HelpCircle, RefreshCw, Compass, Award, Clock } from "lucide-react";

interface DashboardProps {
  lang: Language;
  allSigns: FaSign[];
  onNavigate: (view: "dashboard" | "library" | "flashcards" | "quiz" | "draw") => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ lang, allSigns, onNavigate }) => {
  const t = translations[lang];
  const progress = getSRSProgress();

  const totalSigns = allSigns.length; // 256
  const studiedSigns = Object.keys(progress).length;

  const now = Date.now();
  const dueCards = Object.values(progress).filter(
    (card) => card.nextReviewDate <= now
  ).length;

  const mothers = allSigns.filter((s) => s.isMother);
  const derived = allSigns.filter((s) => !s.isMother);

  const masteredMothers = mothers.filter(
    (s) => (progress[s.id]?.repetitions ?? 0) >= 3
  ).length;

  const masteredDerived = derived.filter(
    (s) => (progress[s.id]?.repetitions ?? 0) >= 3
  ).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 p-8 border border-amber-900/40 text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-2">
          {t.subtitle}
        </h2>
        <p className="text-stone-300 max-w-xl mx-auto md:mx-0">
          Explorez la géomancie sacrée des peuples Yoruba et Fon. Entraînez-vous quotidiennement pour mémoriser les Kpólì (signes).
        </p>
      </div>

      {/* Statistics Cards */}
      <div>
        <h3 className="text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          {t.statsTitle}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-900/60 backdrop-blur-md p-5 rounded-2xl border border-stone-800 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider">Signes Étudiés</p>
              <h4 className="text-2xl font-bold text-stone-100">{studiedSigns} / {totalSigns}</h4>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md p-5 rounded-2xl border border-stone-800 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider">{t.dueToday}</p>
              <h4 className="text-2xl font-bold text-stone-100">{dueCards}</h4>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md p-5 rounded-2xl border border-stone-800 flex items-center gap-4">
            <div className="p-3 bg-amber-400/10 rounded-xl text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider">{t.statsMothers}</p>
              <h4 className="text-2xl font-bold text-stone-100">{masteredMothers} / 16</h4>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md p-5 rounded-2xl border border-stone-800 flex items-center gap-4">
            <div className="p-3 bg-stone-500/10 rounded-xl text-stone-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider">{t.statsDerived}</p>
              <h4 className="text-2xl font-bold text-stone-100">{masteredDerived} / 240</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Shortcuts / Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flashcards shortcut */}
        <div
          onClick={() => onNavigate("flashcards")}
          className="group relative cursor-pointer overflow-hidden bg-gradient-to-br from-amber-950/30 to-stone-900/90 hover:from-amber-900/40 hover:to-stone-900 p-6 rounded-2xl border border-amber-900/20 hover:border-amber-700/50 transition-all duration-300 flex flex-col justify-between h-48 active:scale-[0.98]"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-500/10 group-hover:bg-amber-500/20 rounded-xl text-amber-400 transition-colors">
              <RefreshCw className="w-8 h-8" />
            </div>
            {dueCards > 0 && (
              <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-bold animate-bounce">
                {dueCards} dû(s)
              </span>
            )}
          </div>
          <div>
            <h4 className="text-lg font-bold text-amber-200 mb-1">{t.flashcards}</h4>
            <p className="text-sm text-stone-400">
              Réviser à l'aide de l'algorithme Anki / SM-2 pour une mémorisation parfaite.
            </p>
          </div>
        </div>

        {/* Draw Simulator shortcut */}
        <div
          onClick={() => onNavigate("draw")}
          className="group relative cursor-pointer overflow-hidden bg-gradient-to-br from-red-950/30 to-stone-900/90 hover:from-red-900/40 hover:to-stone-900 p-6 rounded-2xl border border-red-900/20 hover:border-red-700/50 transition-all duration-300 flex flex-col justify-between h-48 active:scale-[0.98]"
        >
          <div className="p-3 bg-red-500/10 group-hover:bg-red-500/20 rounded-xl text-red-400 transition-colors w-max">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-red-200 mb-1">{t.draw}</h4>
            <p className="text-sm text-stone-400">
              Simuler le tirage traditionnel du Fa (Agoumagan) et interpréter le signe obtenu.
            </p>
          </div>
        </div>

        {/* Library shortcut */}
        <div
          onClick={() => onNavigate("library")}
          className="group relative cursor-pointer overflow-hidden bg-stone-900/60 hover:bg-stone-900 p-6 rounded-2xl border border-stone-800 hover:border-amber-900/30 transition-all duration-300 flex flex-col justify-between h-48 active:scale-[0.98]"
        >
          <div className="p-3 bg-stone-800 group-hover:bg-stone-700 rounded-xl text-amber-400 transition-colors w-max">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-stone-200 mb-1">{t.library}</h4>
            <p className="text-sm text-stone-400">
              Consulter la liste complète des 256 signes, leurs Vodouns, proverbes et sagesses.
            </p>
          </div>
        </div>

        {/* Quiz shortcut */}
        <div
          onClick={() => onNavigate("quiz")}
          className="group relative cursor-pointer overflow-hidden bg-stone-900/60 hover:bg-stone-900 p-6 rounded-2xl border border-stone-800 hover:border-amber-900/30 transition-all duration-300 flex flex-col justify-between h-48 active:scale-[0.98]"
        >
          <div className="p-3 bg-stone-800 group-hover:bg-stone-700 rounded-xl text-amber-400 transition-colors w-max">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-stone-200 mb-1">{t.quiz}</h4>
            <p className="text-sm text-stone-400">
              Tester vos connaissances par le biais de questions interactives à choix multiples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
