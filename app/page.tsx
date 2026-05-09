import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-400/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/30 rounded-full blur-[150px] pointer-events-none" />

      <main className="text-center z-10 px-6 max-w-4xl">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-amber-200 bg-amber-50 backdrop-blur-sm text-sm text-amber-700 font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-3 animate-pulse" />
          Planowanie podróży z AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          podAI preferencje <br />
          i{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
            wyruszAI
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Powiedz nam czego potrzebujesz od swojego wyjazdu, a za 5 minut możesz się pakować w dowolne miejsce na świecie. Nasza najbardziej zaawansowana sztuczna inteligencja przygotuje dla Ciebie spersonalizowany plan całej podróży.
        </p>

        <Link 
          href="/plan" 
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-semibold text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          wyruszAI
          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </main>

      <footer className="absolute bottom-6 text-sm text-slate-500">
        wyruszAI © 2026. Zbudowano z Next.js i Gemini AI.
      </footer>
    </div>
  );
}
