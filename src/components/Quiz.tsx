import React, { useState } from "react";
import { translations, type Language } from "../utils/translations";
import { type FaSign } from "../utils/faEngine";
import { FaSignRepresentation } from "./FaSignRepresentation";
import { HelpCircle, RefreshCw, Award, CheckCircle2, XCircle } from "lucide-react";

interface QuizProps {
  lang: Language;
  allSigns: FaSign[];
}

interface Question {
  sign: FaSign;
  options: string[]; // Options of names or meanings depending on quiz type
  correctAnswer: string;
}

export const Quiz: React.FC<QuizProps> = ({ lang, allSigns }) => {
  const t = translations[lang];
  const [quizType, setQuizType] = useState<"pattern-to-name" | "name-to-meaning" | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Generate 10 random questions
  const startQuiz = (type: "pattern-to-name" | "name-to-meaning") => {
    setQuizType(type);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
    setCurrentIdx(0);

    // Limit pool to Mother signs + first 30 derived signs to avoid overly difficult quizzes for beginners
    // But mix them. Actually, let's prioritize Mother signs and easily recognizable signs, or take from all 256
    const pool = allSigns;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const selectedQuestions: Question[] = [];

    for (let i = 0; i < 10; i++) {
      const sign = shuffledPool[i];
      let correctAnswer = "";
      let options: string[] = [];

      if (type === "pattern-to-name") {
        correctAnswer = lang === "fon" ? sign.nameFon : sign.nameFrench;
        // Collect 3 distractors
        const distractors = pool
          .filter((s) => s.id !== sign.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((s) => (lang === "fon" ? s.nameFon : s.nameFrench));
        options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);
      } else {
        correctAnswer = lang === "fon" ? sign.meaningFon : sign.meaningFr;
        const distractors = pool
          .filter((s) => s.id !== sign.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((s) => (lang === "fon" ? s.meaningFon : s.meaningFr));
        options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);
      }

      selectedQuestions.push({
        sign,
        options,
        correctAnswer,
      });
    }

    setQuestions(selectedQuestions);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-amber-200 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-400" />
          {t.quizTitle}
        </h2>
        <p className="text-sm text-stone-400">{t.quizInstructions}</p>
      </div>

      {!quizType ? (
        // Select Quiz Type Screen
        <div className="bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-6 md:p-8 space-y-6">
          <p className="text-stone-300 font-medium text-center">{t.selectQuizType}</p>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => startQuiz("pattern-to-name")}
              className="group p-5 bg-stone-950/60 hover:bg-amber-950/20 border border-stone-850 hover:border-amber-950 rounded-2xl text-left active:scale-[0.98] transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                  {t.quizTypePattern}
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Observez le tracé des colonnes sacrées et devinez le nom du Kpólì correspondant.
                </p>
              </div>
            </button>

            <button
              onClick={() => startQuiz("name-to-meaning")}
              className="group p-5 bg-stone-950/60 hover:bg-red-950/20 border border-stone-850 hover:border-red-950 rounded-2xl text-left active:scale-[0.98] transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-red-300 group-hover:text-red-200 transition-colors">
                  {t.quizTypeMeaning}
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Lisez le nom du signe et associez-le à sa signification spirituelle ou son Vodoun.
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : completed ? (
        // Completed Screen
        <div className="bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-8 text-center space-y-6 flex flex-col items-center shadow-xl">
          <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full w-max">
            <Award className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-stone-200">Session Terminée !</h3>
            <p className="text-3xl font-extrabold text-amber-400">
              {score} / 10
            </p>
            <p className="text-xs text-stone-400">
              {score >= 8
                ? "Excellent travail ! Votre connexion spirituelle au Fa se renforce."
                : score >= 5
                ? "Bonne tentative. Continuez à réviser avec les flashcards."
                : "Ne vous découragez pas. Le Fa demande de la patience et du temps."}
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => setQuizType(null)}
              className="flex-1 bg-stone-950 hover:bg-stone-900 border border-stone-850 text-stone-300 font-bold py-3.5 px-5 rounded-2xl active:scale-[0.98] transition"
            >
              Menu principal
            </button>
            <button
              onClick={() => startQuiz(quizType)}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold py-3.5 px-5 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t.restartQuiz}
            </button>
          </div>
        </div>
      ) : (
        // Question Screen
        <div className="bg-stone-900/40 backdrop-blur border border-stone-850 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-xl">
          {/* Question Indicator & Score */}
          <div className="w-full flex justify-between items-center text-xs text-stone-400">
            <span>
              {t.question} {currentIdx + 1} / 10
            </span>
            <span>
              {t.score}: {score}
            </span>
          </div>

          {/* Question area */}
          {quizType === "pattern-to-name" ? (
            <div className="my-2 flex flex-col items-center gap-4">
              <FaSignRepresentation
                patternLeft={currentQuestion.sign.patternLeft}
                patternRight={currentQuestion.sign.patternRight}
                size="md"
              />
              <p className="text-xs text-stone-400 italic">Trouvez le nom de ce Kpólì :</p>
            </div>
          ) : (
            <div className="my-4 text-center space-y-2">
              <h3 className="text-3xl font-extrabold text-amber-400">
                {currentQuestion.sign.nameFon}
              </h3>
              <p className="text-xs text-stone-400 italic">
                Yoruba: {currentQuestion.sign.nameYoruba} | Français: {currentQuestion.sign.nameFrench}
              </p>
              <p className="text-xs text-stone-400 pt-2">Quelle est la signification de ce signe ?</p>
            </div>
          )}

          {/* Options Grid */}
          <div className="w-full grid grid-cols-1 gap-2.5">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "bg-stone-950/60 border-stone-850 hover:bg-stone-900 text-stone-200";

              if (isAnswered) {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = option === selectedOption;

                if (isCorrect) {
                  btnClass = "bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-red-950/50 border-red-500 text-red-300 font-bold";
                } else {
                  btnClass = "bg-stone-950/30 border-stone-900 text-stone-500 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between active:scale-[0.99] ${btnClass}`}
                >
                  <span className="leading-snug">{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full bg-stone-100 hover:bg-white text-stone-950 font-bold py-3.5 px-6 rounded-2xl active:scale-[0.98] transition duration-200 flex items-center justify-center gap-2 animate-pulse-slow"
            >
              {t.nextQuestion}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
