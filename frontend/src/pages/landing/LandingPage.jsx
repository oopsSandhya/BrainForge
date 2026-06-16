import { useNavigate } from "react-router-dom";

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

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold text-white">BrainForge</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white px-4 py-2 text-sm transition"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-semibold transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-36 pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-indigo-900/40 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-indigo-800">
            Train smarter. Think faster.
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Your brain gets better
            <span className="text-indigo-400"> with practice.</span>
          </h1>
          <p className="text-gray-400 text-xl mb-10 leading-relaxed">
            BrainForge is a daily brain training platform with 10 skill-based games,
            personal progress tracking, and a global leaderboard.
            Five minutes a day is all it takes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl text-lg font-bold transition"
            >
              Start Training — It is Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-black text-indigo-400">10</p>
            <p className="text-gray-400 text-sm mt-1">Brain Games</p>
          </div>
          <div>
            <p className="text-3xl font-black text-indigo-400">6</p>
            <p className="text-gray-400 text-sm mt-1">Cognitive Skills</p>
          </div>
          <div>
            <p className="text-3xl font-black text-indigo-400">5 min</p>
            <p className="text-gray-400 text-sm mt-1">Daily Session</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">10 games. 6 skills.</h2>
            <p className="text-gray-400 text-lg">
              Every game is designed to challenge a specific part of how your brain works.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {GAMES_PREVIEW.map((game) => (
              <div
                key={game.name}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-700 transition group"
              >
                <span className="text-3xl mb-3 block">{game.icon}</span>
                <p className="font-bold text-white text-lg">{game.name}</p>
                <p className="text-gray-500 text-sm mt-1">{game.skill}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">
            + 4 more games inside the app
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Everything you need to improve.</h2>
            <p className="text-gray-400 text-lg">
              Not just games — a complete training system.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-gray-600 transition"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to start training?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Create a free account and play your first game in under a minute.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 hover:bg-indigo-500 px-10 py-5 rounded-xl text-xl font-bold transition"
          >
            Create Free Account
          </button>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="font-bold text-white">BrainForge</span>
          </div>
          <p className="text-gray-500 text-sm">
            Built by{" "}
            
             <a href="https://github.com/sandhyacgu"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Sandhya
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}