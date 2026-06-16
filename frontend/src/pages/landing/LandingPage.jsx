import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const FEATURES = [
  {
    icon: "⚡",
    title: "10 Unique Games",
    desc: "Each game targets a specific cognitive skill — from reaction speed to pattern recognition.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    desc: "Your scores are saved after every session. Watch yourself improve over time with real charts.",
  },
  {
    icon: "🏆",
    title: "Compete on the Leaderboard",
    desc: "See where you rank against other players based on your total training score.",
  },
  {
    icon: "🎯",
    title: "Daily Challenge",
    desc: "A new brain puzzle every day. Keep your streak alive and stay sharp.",
  },
];

const GAMES_PREVIEW = [
  { icon: "⚡", name: "Reflex Rush", skill: "Reaction Speed" },
  { icon: "🧠", name: "Memory Sequence", skill: "Working Memory" },
  { icon: "🎯", name: "Pattern Recall", skill: "Visual Memory" },
  { icon: "🔢", name: "Speed Math", skill: "Mental Processing" },
  { icon: "🎨", name: "Color Trap", skill: "Cognitive Flexibility" },
  { icon: "👑", name: "Boss Mode", skill: "All Skills" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  useScrollAnimation();

  return (
    <>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }

        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.5);
        }

        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
          filter: brightness(1.1);
        }

        .btn-secondary {
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .btn-secondary:hover {
          transform: translateY(-2px) scale(1.02);
          background: #374151;
        }

        .hero-gradient {
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%);
        }

        .stat-glow {
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }

        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .light-mode {
          background: #f8fafc !important;
          color: #0f172a !important;
        }
      `}</style>

      <div className={`min-h-screen overflow-x-hidden ${isDark ? "bg-gray-950 text-white" : "bg-slate-50 text-gray-900"}`}>

        {/* NAVBAR */}
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDark ? "bg-gray-950/80 border-gray-800/60" : "bg-white/80 border-gray-200"}`}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl">🧠</span>
              <span className="text-lg font-bold">BrainForge</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsDark(!isDark)}
                className="px-2 py-1.5 text-lg transition hover:scale-110"
                title="Toggle theme"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`px-3 py-1.5 text-xs sm:text-sm transition whitespace-nowrap ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn-primary px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero-gradient pt-32 pb-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className={`scroll-animate inline-block text-xs font-medium px-4 py-1.5 rounded-full mb-6 border ${isDark ? "bg-indigo-950/60 text-indigo-300 border-indigo-800/50" : "bg-indigo-50 text-indigo-600 border-indigo-200"}`}>
              Train smarter. Think faster.
            </span>
            <h1 className="scroll-animate delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              Your brain gets better
              <span className="gradient-text"> with practice.</span>
            </h1>
            <p className={`scroll-animate delay-2 text-base sm:text-lg mb-10 leading-relaxed max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              BrainForge is a daily brain training platform with 10 skill-based games,
              personal progress tracking, and a global leaderboard.
              Five minutes a day is all it takes.
            </p>
            <div className="scroll-animate delay-3 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="btn-primary px-8 py-4 rounded-xl text-base font-bold text-white"
              >
                Start Training — It is Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`btn-secondary px-8 py-4 rounded-xl text-base font-semibold border ${isDark ? "bg-gray-800/80 border-gray-700/50 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}
              >
                Log In
              </button>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className={`border-y ${isDark ? "border-gray-800/60 bg-gray-900/30" : "border-gray-200 bg-white/60"}`}>
          <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-4 text-center">
            {[
              { val: "10", label: "Brain Games" },
              { val: "6", label: "Cognitive Skills" },
              { val: "5 min", label: "Daily Session" },
            ].map((s, i) => (
              <div key={s.label} className={`scroll-animate delay-${i + 1}`}>
                <p className="stat-glow text-2xl sm:text-3xl font-black text-indigo-500">{s.val}</p>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GAMES PREVIEW */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14 scroll-animate">
              <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">10 games. 6 skills.</h2>
              <p className={`text-base sm:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Every game is designed to challenge a specific part of how your brain works.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {GAMES_PREVIEW.map((game, i) => (
                <div
                  key={game.name}
                  className={`scroll-animate delay-${i + 1} card-hover rounded-2xl p-4 sm:p-6 cursor-default border ${isDark ? "bg-gray-900/80 border-gray-800/80" : "bg-white border-gray-200"}`}
                >
                  <span className="text-2xl sm:text-3xl mb-3 block">{game.icon}</span>
                  <p className="font-bold text-sm sm:text-base">{game.name}</p>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{game.skill}</p>
                </div>
              ))}
            </div>
            <p className={`text-center text-sm scroll-animate ${isDark ? "text-slate-600" : "text-slate-400"}`}>
              + 4 more games inside the app
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className={`py-24 px-4 border-y ${isDark ? "bg-gray-900/20 border-gray-800/60" : "bg-slate-100/60 border-gray-200"}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14 scroll-animate">
              <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">Everything you need to improve.</h2>
              <p className={`text-base sm:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Not just games — a complete training system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`scroll-animate delay-${i + 1} card-hover rounded-2xl p-6 border ${isDark ? "bg-gray-900/80 border-gray-800/80" : "bg-white border-gray-200"}`}
                >
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold mb-2">{f.title}</h3>
                  <p className={`leading-relaxed text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-4 text-center hero-gradient">
          <div className="max-w-2xl mx-auto">
            <h2 className="scroll-animate text-3xl sm:text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Ready to start training?
            </h2>
            <p className={`scroll-animate delay-1 text-base sm:text-lg mb-10 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Create a free account and play your first game in under a minute.
            </p>
            <div className="scroll-animate delay-2">
              <button
                onClick={() => navigate("/register")}
                className="btn-primary px-10 py-4 rounded-xl text-lg font-bold text-white"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`border-t py-8 px-4 ${isDark ? "border-gray-800/60" : "border-gray-200"}`}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <span className="font-bold">BrainForge</span>
            </div>
            <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Built by{" "}
              <a href="https://github.com/oopsSandhya" target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-400 transition-colors">Sandhya</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}