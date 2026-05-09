"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Backpack, Luggage, Star, Check, MapPin, Dumbbell, UtensilsCrossed, Landmark, Heart, Baby, Laptop, Sparkles, Compass, Building2, Palmtree, Music, TreePine } from 'lucide-react';
import { DESTINATIONS, MONTHS_PL, getBudgetLabel } from './data';

const MapSelector = dynamic(() => import('./MapSelector'), { ssr: false, loading: () => <div className="w-full h-72 bg-sky-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-slate-400">Ładowanie mapy...</div> });

type NominatimResult = { place_id: number; display_name: string; };

function CityAutocomplete({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&accept-language=pl`,
        { headers: { 'Accept-Language': 'pl' } }
      );
      const data: NominatimResult[] = await res.json();
      setResults(data);
      setOpen(data.length > 0);
    } catch { setResults([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fetchSuggestions(query), 350);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (item: NominatimResult) => {
    const short = item.display_name.split(',')[0].trim();
    setQuery(short);
    onChange(short);
    setOpen(false);
    setResults([]);
  };

  return (
    <div ref={wrapRef} className="relative max-w-lg">
      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 z-10" />
      <input
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); }}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Wpisz miasto lub region (opcjonalnie)..."
        className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-11 pr-12 py-4 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      )}
      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {results.map(r => (
            <li key={r.place_id}>
              <button
                type="button"
                onClick={() => select(r)}
                className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-sm transition-colors border-b border-slate-100 last:border-0 flex items-start gap-3"
              >
                <MapPin size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{r.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type FormData = {
  continent: string; country: string[]; city: string;
  dateType: 'dates'|'flex'; startDate: string; endDate: string;
  flexMonthFrom: string; flexMonthTo: string; flexDays: string; flexAnyDays: boolean;
  participants: number; transport: string[]; rentCar: boolean; layover: string;
  budgetNocleg: number; budgetJedzenie: number; budgetAtrakcje: number;
  tripTypes: string[];
  aiInterview: string;
};

const SEL = 'bg-emerald-50 border-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.2)]';
const UNSEL = 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md';
const CARD = 'relative p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer';

function CheckBadge() {
  return (
    <span className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
      <Check size={12} color="white" strokeWidth={3}/>
    </span>
  );
}

function SelectionCard({ label, icon, selected, onClick }: { label:string; icon?:string; selected:boolean; onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick} className={`${CARD} flex flex-col gap-3 ${selected ? SEL : UNSEL}`}>
      {selected && <CheckBadge/>}
      {icon && <span className="text-3xl">{icon}</span>}
      <span className={`font-semibold text-sm leading-tight ${selected ? 'text-emerald-800' : 'text-slate-700'}`}>{label}</span>
    </button>
  );
}

function BudgetSlider({ label, name, value, onChange }: { label:string; name:string; value:number; onChange:(v:number)=>void }) {
  const info = getBudgetLabel(value);
  const BIcon = value <= 150 ? Backpack : value <= 400 ? Luggage : Star;
  const iconColor = value <= 150 ? '#64748b' : value <= 400 ? '#0ea5e9' : '#f59e0b';
  const pct = ((value - 50) / 1950) * 100;
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-800 text-lg">{label}</span>
        <BIcon size={28} color={iconColor}/>
      </div>
      <div>
        <p className="font-semibold text-emerald-700">{info.label}</p>
        <p className="text-xs text-slate-400">{info.sub}</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range" min={50} max={2000} step={25} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer"
          style={{ background: `linear-gradient(to right, #10b981 0%, #10b981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
        />
        <input
          type="number" min={50} max={5000} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-24 border-2 border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
        />
        <span className="text-xs text-slate-400 whitespace-nowrap">PLN/dzień</span>
      </div>
    </div>
  );
}

export default function PlanTripPage() {
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState<FormData>({
    continent:'', country:[], city:'',
    dateType:'dates', startDate:'', endDate:'',
    flexMonthFrom:'', flexMonthTo:'', flexDays:'', flexAnyDays:false,
    participants:1, transport:[], rentCar:false, layover:'akceptuje',
    budgetNocleg:200, budgetJedzenie:100, budgetAtrakcje:100,
    tripTypes:[],
    aiInterview:'',
  });

  const set = (patch: Partial<FormData>) => setFd(p => ({...p, ...patch}));
  const toggleArr = (field: 'transport'|'tripTypes', v: string) =>
    set({ [field]: fd[field].includes(v) ? fd[field].filter(x=>x!==v) : [...fd[field], v] });

  const nextStep = () => {
    if (step === 6) {
      console.log("Wysłano dane z formularza do wygenerowania planu:", fd);
    }
    if (step < 7) setStep(s=>s+1);
  };
  const prevStep = () => step > 1 && setStep(s=>s-1);

  const generateAiMessage = () => {
    const parts = ["Świetne wybory!"];
    
    if (fd.transport.includes('Kamper')) {
      parts.push("Podróż kamperem daje mnóstwo wolności. Wolicie zorganizowane kempingi z pełnym węzłem sanitarnym czy spanie na dziko?");
    } else if (fd.transport.includes('Własne Auto') || fd.rentCar) {
      parts.push("Samochód daje ogromną swobodę. Nastawiacie się na szybkie autostrady, czy malownicze trasy z dala od cywilizacji?");
    }

    if (fd.tripTypes.includes('Imprezy')) {
      parts.push("Zauważyłem chęć na imprezy – wolicie klimatyczne beach bary, huczne kluby czy nocne ogniska?");
    }
    if (fd.tripTypes.includes('Kulinarna Podróż')) {
      parts.push("Kulinaria to podstawa: wolicie fine-dining w eleganckich lokalach czy autentyczny, lokalny street food?");
    }
    if (fd.tripTypes.includes('Wyjazd z Dziećmi')) {
      parts.push("Biorąc pod uwagę najmłodszych – szukamy piaszczystych, bezpiecznych plaż czy raczej parków wodnych i rozrywki?");
    }
    if (fd.tripTypes.includes('Natura') || fd.tripTypes.includes('Poza Szlakiem')) {
      parts.push("Ucieczka od zgiełku to wspaniały plan. Bliżej Wam do górskich wędrówek czy zaszycia się w głuszy lasu?");
    }

    if (parts.length === 1) {
      parts.push("Aby idealnie dopasować plan, napisz mi krótko: jak wygląda Wasz idealny dzień w podróży?");
    }
    
    parts.push("Czego absolutnie unikać (np. głośnych kurortów)?");

    return parts.join(" ");
  };

  const continents = Object.keys(DESTINATIONS);
  const countries = fd.continent ? Object.keys(DESTINATIONS[fd.continent]||{}) : [];
  const hasSamolot = fd.transport.includes('Samolot');

  const inputCls = "w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all";

  const monthBtn = (m: string, field: 'flexMonthFrom'|'flexMonthTo') => {
    const active = fd[field] === m;
    return (
      <button key={m+field} type="button" onClick={() => set({[field]: m})}
        className={`py-2.5 px-1 rounded-xl text-xs font-medium border-2 transition-all ${active ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
        {m}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 flex flex-col font-sans">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/40 rounded-full blur-[120px] pointer-events-none"/>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/30 rounded-full blur-[120px] pointer-events-none"/>

      <nav className="w-full p-6 flex justify-between items-center z-10">
        <Link href="/" className="text-2xl font-bold">wyrusz<span className="text-emerald-500">AI</span></Link>
        <div className="text-sm text-slate-500 font-medium bg-white/60 px-4 py-2 rounded-full border border-slate-200 backdrop-blur-sm">
          Krok {Math.min(step,6)} z 6
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center py-8 px-4 z-10 w-full">
        <div className="w-full max-w-5xl">
          <div className="w-full bg-slate-200 h-3 rounded-full mb-10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{width:`${(Math.min(step,6)/6)*100}%`}}/>
          </div>

          <form onSubmit={e=>e.preventDefault()} className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 sm:p-12 rounded-[2rem] shadow-2xl">

            {/* S1: Kierunek */}
            <div className={step===1?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Kierunek</h1>
              <p className="text-lg text-slate-600 mb-8">Wybierz kontynent, kraj i miasto – możesz zatrzymać się na każdym poziomie.</p>

              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Kontynent / Region</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {continents.map(c => {
                      const icons: Record<string,string> = {'Gdziekolwiek':'🌍','Europa':'🏰','Azja':'🍜','Ameryka Północna':'🗽','Ameryka Środkowa':'🌴','Ameryka Południowa':'🦜','Afryka':'🦁','Australia i Oceania':'🦘'};
                      return <SelectionCard key={c} label={c} icon={icons[c]} selected={fd.continent===c} onClick={()=>set({continent:c,country:[],city:''})}/>;
                    })}
                  </div>
                </div>

                {fd.continent && fd.continent !== 'Gdziekolwiek' && countries.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Kraj</p>
                    <MapSelector
                      continent={fd.continent}
                      countries={countries}
                      selected={fd.country}
                      onSelect={arr => set({country: arr, city: ''})}
                    />
                  </div>
                )}

                {fd.country.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Miasto lub region</p>
                    <CityAutocomplete value={fd.city} onChange={v => set({city: v})} />
                  </div>
                )}
              </div>
            </div>

            {/* S2: Czas trwania */}
            <div className={step===2?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Czas trwania</h1>
              <p className="text-lg text-slate-600 mb-8">Kiedy i na jak długo chcesz wyjechać?</p>

              <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit">
                {(['dates','flex'] as const).map(t => (
                  <button key={t} type="button" onClick={()=>set({dateType:t})}
                    className={`px-8 py-3 rounded-xl font-medium transition-all ${fd.dateType===t?'bg-white text-emerald-600 shadow-sm':'text-slate-500 hover:text-slate-700'}`}>
                    {t==='dates'?'Konkretne daty':'Elastyczny miesiąc'}
                  </button>
                ))}
              </div>

              {fd.dateType==='dates' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  <div><label className="block text-sm font-semibold text-slate-700 mb-2">Wyjazd</label>
                    <input type="date" name="startDate" value={fd.startDate} onChange={e=>set({startDate:e.target.value})} className={inputCls}/></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-2">Powrót</label>
                    <input type="date" name="endDate" value={fd.endDate} onChange={e=>set({endDate:e.target.value})} className={inputCls}/></div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">Od miesiąca</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {MONTHS_PL.map(m=>monthBtn(m,'flexMonthFrom'))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">Do miesiąca</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {MONTHS_PL.map(m=>monthBtn(m,'flexMonthTo'))}
                    </div>
                  </div>
                  <div className="max-w-xl">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Ile dni chcesz spędzić na wyjeździe?</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <input type="number" value={fd.flexDays} onChange={e=>set({flexDays:e.target.value})} disabled={fd.flexAnyDays}
                        placeholder="np. 7" className={`w-32 ${inputCls} disabled:opacity-40`}/>
                      <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-4 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
                        <input type="checkbox" checked={fd.flexAnyDays} onChange={e=>set({flexAnyDays:e.target.checked})} className="w-5 h-5 rounded text-emerald-500 border-slate-300 focus:ring-emerald-500"/>
                        <span className="font-medium text-slate-700">Dowolnie (AI dobierze najkorzystniejszy wariant)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* S3: Logistyka */}
            <div className={step===3?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Logistyka</h1>
              <p className="text-lg text-slate-600 mb-8">Kto jedzie i jak chcecie się przemieszczać?</p>
              <div className="space-y-10">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Liczba uczestników</p>
                  <div className="flex items-center gap-4 bg-white border-2 border-slate-200 p-2 rounded-2xl w-fit">
                    <button type="button" onClick={()=>set({participants:Math.max(1,fd.participants-1)})} className="w-14 h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xl font-bold transition-colors flex items-center justify-center">−</button>
                    <span className="text-3xl font-bold w-14 text-center">{fd.participants}</span>
                    <button type="button" onClick={()=>set({participants:fd.participants+1})} className="w-14 h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xl font-bold transition-colors flex items-center justify-center">+</button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Środek transportu</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[{id:'Samolot',icon:'✈️'},{id:'Autobus',icon:'🚌'},{id:'Kamper',icon:'🚐'},{id:'Własne Auto',icon:'🚗'}].map(t=>(
                      <SelectionCard key={t.id} label={t.id} icon={t.icon} selected={fd.transport.includes(t.id)} onClick={()=>toggleArr('transport',t.id)}/>
                    ))}
                  </div>
                </div>
                {hasSamolot && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Preferencje lotów</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {[{val:'akceptuje',label:'Akceptuję przesiadki'},{val:'bezposrednie',label:'Tylko loty bezpośrednie'}].map(opt => (
                          <label key={opt.val} className={`flex items-center gap-4 flex-1 cursor-pointer p-5 border-2 rounded-2xl transition-all ${fd.layover===opt.val ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300'}`}>
                            <input type="radio" name="layover" value={opt.val} checked={fd.layover===opt.val} onChange={()=>set({layover:opt.val})} className="w-5 h-5 text-emerald-500 border-slate-300 focus:ring-emerald-500"/>
                            <span className={`font-semibold ${fd.layover===opt.val?'text-emerald-800':'text-slate-700'}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <label className="flex items-center gap-5 cursor-pointer bg-emerald-50/60 p-6 border-2 border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <input type="checkbox" checked={fd.rentCar} onChange={e=>set({rentCar:e.target.checked})} className="sr-only peer"/>
                        <div className="w-14 h-7 bg-slate-300 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-7"/>
                      </div>
                      <span className="font-semibold text-slate-800 text-lg">Chcę wynająć pojazd na miejscu</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* S4: Budżet */}
            <div className={step===4?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Budżet</h1>
              <p className="text-lg text-slate-600 mb-8">Ustaw dzienny budżet dla każdej kategorii na osobę.</p>
              <div className="space-y-5">
                <BudgetSlider label="🛏️  Nocleg" name="budgetNocleg" value={fd.budgetNocleg} onChange={v=>set({budgetNocleg:v})}/>
                <BudgetSlider label="🍽️  Jedzenie" name="budgetJedzenie" value={fd.budgetJedzenie} onChange={v=>set({budgetJedzenie:v})}/>
                <BudgetSlider label="🎭  Atrakcje" name="budgetAtrakcje" value={fd.budgetAtrakcje} onChange={v=>set({budgetAtrakcje:v})}/>
                <div className="flex items-center justify-between bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-6 py-4">
                  <span className="font-bold text-slate-700">Łączny szacowany budżet dzienny</span>
                  <span className="text-2xl font-bold text-emerald-700">{fd.budgetNocleg+fd.budgetJedzenie+fd.budgetAtrakcje} PLN</span>
                </div>
              </div>
            </div>

            {/* S5: Typ wyjazdu */}
            <div className={step===5?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Typ wyjazdu</h1>
              <p className="text-lg text-slate-600 mb-8">Jaki charakter ma mieć ta podróż? Wybierz jeden lub kilka.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  {id:'Aktywnie i Sportowo', Icon:Dumbbell, color:'text-orange-500'},
                  {id:'Kulinarna Podróż', Icon:UtensilsCrossed, color:'text-amber-500'},
                  {id:'Kultura i Historia', Icon:Landmark, color:'text-blue-500'},
                  {id:'Romantyczny Wypad', Icon:Heart, color:'text-rose-500'},
                  {id:'Wyjazd z Dziećmi', Icon:Baby, color:'text-sky-500'},
                  {id:'Workation', Icon:Laptop, color:'text-violet-500'},
                  {id:'Wellness & Spa', Icon:Sparkles, color:'text-pink-500'},
                  {id:'Poza Szlakiem', Icon:Compass, color:'text-emerald-600'},
                  {id:'Citybreak', Icon:Building2, color:'text-indigo-500'},
                  {id:'Chill', Icon:Palmtree, color:'text-cyan-500'},
                  {id:'Imprezy', Icon:Music, color:'text-purple-500'},
                  {id:'Natura', Icon:TreePine, color:'text-green-600'},
                ] as {id:string; Icon:React.ElementType; color:string}[]).map(t=>{
                  const sel = fd.tripTypes.includes(t.id);
                  return (
                    <button key={t.id} type="button" onClick={()=>toggleArr('tripTypes',t.id)}
                      className={`${CARD} flex flex-col items-center justify-center gap-3 text-center py-7 ${sel?SEL:UNSEL}`}>
                      {sel&&<CheckBadge/>}
                      <t.Icon size={36} className={sel?'text-emerald-600':t.color} strokeWidth={1.5}/>
                      <span className={`font-bold text-sm leading-tight ${sel?'text-emerald-800':'text-slate-700'}`}>{t.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* S6: Wywiad AI */}
            <div className={step===6?'relative':'hidden'}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-800">Ostatnie Szlify</h1>
              <p className="text-lg text-slate-600 mb-8">Od idealnego planu dzieli Cię tylko jeden krok. Porozmawiajmy o detalach.</p>
              
              <div className="max-w-4xl mx-auto space-y-8">
                {/* AI Bubble */}
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgba(16,185,129,0.3)] border-2 border-white">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-5 sm:p-7 rounded-3xl rounded-tl-none shadow-sm text-slate-700 text-lg leading-relaxed relative">
                    <p className="font-bold text-emerald-800 mb-2 flex items-center gap-2">wyruszAI <Sparkles size={16}/></p>
                    <p className="text-emerald-950 font-medium">{generateAiMessage()}</p>
                  </div>
                </div>

                {/* User Input */}
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all shadow-sm ml-0 sm:ml-20">
                  <textarea 
                    name="aiInterview" 
                    value={fd.aiInterview} 
                    onChange={e=>set({aiInterview: e.target.value})} 
                    rows={6}
                    placeholder="Opisz swoje wymarzone detale... (opcjonalnie)" 
                    className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none resize-none text-lg leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* S7: Loading */}
            <div className={step===7?'relative py-20':'hidden'}>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-10">
                  <div className="absolute inset-0 border-t-4 border-r-4 border-yellow-400 rounded-full animate-spin"/>
                  <div className="absolute inset-3 border-b-4 border-l-4 border-emerald-500 rounded-full animate-spin" style={{animationDirection:'reverse',animationDuration:'1.5s'}}/>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">✈️</div>
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">wyruszAI komponuje Twój plan...</h1>
                <p className="text-lg text-slate-600 max-w-xl">Analizujemy Twoje preferencje i dobieramy idealne miejsca, restauracje i trasy.</p>
                <div className="mt-10 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl border-2 border-emerald-100 text-slate-700 font-medium inline-flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"/>Gemini AI pracuje dla Ciebie...
                </div>
              </div>
            </div>

            {/* Navigation */}
            {step < 7 && (
              <div className="mt-10 flex items-center justify-between pt-6 border-t-2 border-slate-100">
                <button type="button" onClick={prevStep}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${step===1?'opacity-0 pointer-events-none':'text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200'}`}>
                  ← Wstecz
                </button>
                <button type="button" onClick={nextStep}
                  className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                  {step===6?'Generuj Plan Podróży ✨':'Dalej →'}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
