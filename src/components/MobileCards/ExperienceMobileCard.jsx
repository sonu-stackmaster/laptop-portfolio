import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ExperienceMobileCard({ isDark }) {
  const { experience } = portfolioData;

  return (
    <div className="space-y-3 text-left">
      {experience.map((exp, idx) => (
        <div 
          key={idx}
          className={`p-3 rounded-xl border space-y-2 relative ${
            isDark 
              ? 'bg-purple-950/30 border-purple-500/20' 
              : 'bg-orange-50/90 border-orange-200 shadow-xs'
          }`}
        >
          <div>
            <h3 className={`text-sm font-extrabold font-heading ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {exp.role}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <div className={`text-[11px] font-bold flex items-center gap-1 ${
                isDark ? 'text-purple-400' : 'text-orange-600'
              }`}>
                <Briefcase size={12} />
                <span>{exp.company}</span>
              </div>
              <div className={`text-[10px] flex items-center gap-1 font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <Calendar size={10} />
                <span>{exp.period}</span>
              </div>
            </div>
          </div>

          <ul className={`space-y-1 pt-2 border-t ${
            isDark ? 'border-purple-500/15' : 'border-orange-200'
          }`}>
            {exp.achievements.map((ach, i) => (
              <li key={i} className={`flex items-start space-x-1.5 text-[11px] leading-relaxed font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <CheckCircle2 size={12} className={`shrink-0 mt-0.5 ${
                  isDark ? 'text-purple-400' : 'text-orange-600'
                }`} />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
