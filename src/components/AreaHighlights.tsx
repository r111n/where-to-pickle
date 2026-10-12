'use client';

import React from 'react';
import { MapPin, Wind, Sparkles, Building2, Flame } from 'lucide-react';

interface AreaHighlightsProps {
  onSelectArea: (locationId: string) => void;
}

export const AreaHighlights: React.FC<AreaHighlightsProps> = ({ onSelectArea }) => {
  const areas = [
    {
      id: 'mangnao',
      name: 'Mangnao / Praxevilla',
      icon: <Sparkles className="h-4 w-4 text-lime-500" />,
      tag: 'Premier Hub',
      desc: 'Floodlit cushioned courts, synthetic mats, vibrant pickleball community.',
    },
    {
      id: 'bantayan',
      name: 'Bantayan Sports Strip',
      icon: <Building2 className="h-4 w-4 text-sky-500" />,
      tag: 'Indoor Air-Cooled',
      desc: 'E.J. Blanco Drive indoor halls, Olympic mats, badminton & pickleball.',
    },
    {
      id: 'valencia',
      name: 'Valencia Highlands',
      icon: <Wind className="h-4 w-4 text-emerald-500" />,
      tag: 'Mountain Breeze',
      desc: '15 mins up the hill, significantly cooler climate, covered multi-sport pavilion.',
    },
    {
      id: 'sibulan',
      name: 'Sibulan Coastal',
      icon: <Flame className="h-4 w-4 text-amber-500" />,
      tag: 'Airport & Seaside',
      desc: '5 mins north of DGT Airport, ocean breeze and active evening play.',
    },
  ];

  return (
    <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-emerald-600 dark:text-lime-400" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Dumaguete Metro Sports Zones
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => onSelectArea(area.id)}
            className="flex flex-col text-left rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-lime-400">
                {area.icon}
                <span>{area.name}</span>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {area.tag}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {area.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
