import { useState, useEffect } from "react";
import { translations, type Language } from "./utils/translations";
import { generateAll256Signs } from "./utils/faEngine";
import { Dashboard } from "./components/Dashboard";
import { Library } from "./components/Library";
import { Flashcards } from "./components/Flashcards";
import { Quiz } from "./components/Quiz";
import { DrawSimulator } from "./components/DrawSimulator";
import { BookOpen, HelpCircle, RefreshCw, Compass, Award, Globe, Menu, X } from "lucide-react";

const all256Signs = generateAll256Signs();

function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("fa_pwa_lang");
    return (saved === "fon" ? "fon" : "fr") as Language;
  });

  const [view, setView] = useState<"dashboard" | "library" | "flashcards" | "quiz" | "draw">("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("fa_pwa_lang", lang);
  }, [lang]);

  const t = translations[lang];

  const handleNavigate = (targetView: typeof view) => {
    setView(targetView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "dashboard" as const, label: t.dashboard, icon: Award },
    { id: "library" as const, label: t.library, icon: BookOpen },
    { id: "flashcards" as const, label: t.flashcards, icon: RefreshCw },
    { id: "quiz" as const, label: t.quiz, icon: HelpCircle },
    { id: "draw" as const, label: t.draw, icon: Compass },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-amber-900/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate("dashboard")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-red-800 flex items-center justify-center font-black text-stone-950 shadow-inner">
              FA
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-amber-500 tracking-tight leading-none m-0">
                Fa Duno
              </h1>
              <p className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase mt-0.5">
                Ifá Divination
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-amber-600/10 text-amber-400 border border-amber-500/35"
                      : "text-stone-300 hover:bg-stone-900/60 hover:text-stone-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang((prev) => (prev === "fr" ? "fon" : "fr"))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-xs font-bold text-amber-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "fr" ? "FON" : "FR"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-stone-300 hover:text-stone-100 hover:bg-stone-900 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[73px] z-30 bg-stone-950/95 border-b border-amber-900/30 p-4 space-y-2 md:hidden animate-fade-in shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-amber-600/10 text-amber-400 border border-amber-500/20"
                    : "text-stone-300 hover:bg-stone-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        {view === "dashboard" && (
          <Dashboard lang={lang} allSigns={all256Signs} onNavigate={handleNavigate} />
        )}
        {view === "library" && <Library lang={lang} allSigns={all256Signs} />}
        {view === "flashcards" && <Flashcards lang={lang} allSigns={all256Signs} />}
        {view === "quiz" && <Quiz lang={lang} allSigns={all256Signs} />}
        {view === "draw" && <DrawSimulator lang={lang} allSigns={all256Signs} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-6 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 space-y-1.5">
          <p className="font-semibold text-stone-400">{t.title} &copy; {new Date().getFullYear()}</p>
          <p>{t.developedBy}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
