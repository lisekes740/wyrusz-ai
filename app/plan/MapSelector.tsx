'use client';
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { POLISH_TO_EN, CONTINENT_GLOBE } from './countryMap';

let RSM: any = null;
try { RSM = require('react-simple-maps'); } catch { /* fallback grid */ }

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const C_OTHER  = '#c5bfb3';
const C_AVAIL  = '#d6c9a8';
const C_HOV    = '#6ee7b7';
const C_SEL    = '#10b981';
const C_STROKE = '#a39f98';

interface Props {
  continent: string;
  countries: string[];
  selected: string[];
  onSelect: (names: string[]) => void;
}

export default function MapSelector({ continent, countries, selected, onSelect }: Props) {
  const [search,   setSearch]   = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (RSM?.ComposableMap) setMapReady(true); }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const globe = CONTINENT_GLOBE[continent] || CONTINENT_GLOBE['Gdziekolwiek'];

  // Build reverse map: English geo name → Polish display name
  const enToPolish = useMemo(() => {
    const m: Record<string, string> = {};
    countries.forEach(c => { if (POLISH_TO_EN[c]) m[POLISH_TO_EN[c]] = c; });
    return m;
  }, [countries]);

  const selectedEn = selected.map(c => POLISH_TO_EN[c]).filter(Boolean);

  const filtered = useMemo(
    () => countries.filter(c => c.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  const handleGeoClick = useCallback((geoName: string) => {
    const polish = enToPolish[geoName];
    if (!polish) return;
    const next = selected.includes(polish) ? selected.filter(c => c !== polish) : [...selected, polish];
    setSearch('');
    setDropOpen(false);
    onSelect(next);
  }, [enToPolish, selected, onSelect]);

  const handleSearchSelect = useCallback((polishName: string) => {
    const next = selected.includes(polishName) ? selected.filter(c => c !== polishName) : [...selected, polishName];
    setSearch('');
    setDropOpen(false);
    onSelect(next);
  }, [selected, onSelect]);

  return (
    <div className="space-y-3">

      {/* Search bar */}
      <div ref={searchRef} className="relative max-w-sm">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setDropOpen(true); }}
          onFocus={() => { if (filtered.length) setDropOpen(true); }}
          placeholder="Szukaj państwa..."
          className="w-full bg-white border-2 border-slate-200 rounded-xl pl-10 pr-9 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all"
        />
        {search && (
          <button type="button"
            onClick={() => { setSearch(''); setDropOpen(false); onSelect(''); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors z-10">
            <X size={14} />
          </button>
        )}
        {dropOpen && search.length > 0 && filtered.length > 0 && (
          <ul className="absolute z-50 top-full mt-1 w-full bg-white border-2 border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-52 overflow-y-auto">
            {filtered.slice(0, 10).map(c => (
              <li key={c}>
                <button type="button" onMouseDown={() => handleSearchSelect(c)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 border-b border-slate-100 last:border-0 transition-colors ${
                    selected.includes(c) ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}>
                  <MapPin size={12} className="text-emerald-400 flex-shrink-0" />
                  {c}
                  {selected.includes(c) && <span className="ml-auto text-emerald-500 text-xs font-bold">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected badges */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(c => (
            <div key={c} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-200">
              <MapPin size={13} />
              {c}
              <button type="button"
                onClick={() => onSelect(selected.filter(x => x !== c))}
                className="ml-1 w-4 h-4 rounded-full bg-emerald-200 hover:bg-emerald-300 flex items-center justify-center transition-colors">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Globe */}
      {mapReady && RSM ? (
        <div
          className="w-full rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-slate-200"
          style={{ height: '380px', background: 'radial-gradient(circle at 40% 35%, #d9f0fa 0%, #cfe8f5 60%, #a8d8ef 100%)' }}
        >
          {/*
            KEY = selectedEn forces the entire ComposableMap to remount when selection changes.
            This guarantees D3 re-applies style.default.fill for every Geography.
          */}
          <RSM.ComposableMap
            key={selectedEn.join('-')}
            projection="geoOrthographic"
            projectionConfig={{ rotate: globe.rotate, scale: globe.scale }}
            style={{ width: '100%', height: '100%' }}
          >
            <RSM.Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const name: string = geo.properties.name || geo.properties.NAME;
                  const polish = enToPolish[name];
                  const inContinent = Boolean(polish);
                  const isSel = selectedEn.includes(name);

                  const defaultFill = isSel ? C_SEL : inContinent ? C_AVAIL : C_OTHER;
                  const hoverFill   = isSel ? '#059669' : inContinent ? C_HOV : C_OTHER;

                  return (
                    <RSM.Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => { if (inContinent) handleGeoClick(name); }}
                      style={{
                        default: {
                          fill: defaultFill,
                          stroke: C_STROKE,
                          strokeWidth: 0.45,
                          outline: 'none',
                          cursor: inContinent ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: hoverFill,
                          stroke: '#7a7570',
                          strokeWidth: 0.7,
                          outline: 'none',
                          cursor: inContinent ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: inContinent ? '#059669' : C_OTHER,
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </RSM.Geographies>
          </RSM.ComposableMap>
        </div>
      ) : (
        /* Fallback grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
          {countries.map(c => (
            <button key={c} type="button" onClick={() => handleSearchSelect(c)}
              className={`relative text-left px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                selected.includes(c)
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}>
              {selected.includes(c) && <span className="absolute top-1.5 right-2 text-emerald-500 text-xs">✓</span>}
              {c}
            </button>
          ))}
        </div>
      )}

      {mapReady && (
        <p className="text-xs text-slate-400 text-center">
          Kliknij kraj na globusie, by go wybrać · Możesz też wpisać jego nazwę powyżej
        </p>
      )}
    </div>
  );
}
