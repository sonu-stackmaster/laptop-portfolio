import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ExperienceCard({ isDark }) {
  const { experience } = portfolioData;

  return (
    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
      {experience.map((exp, idx) => (
        <div 
          key={idx}
          className={`p-4 rounded-xl border space-y-2 relative ${
            isDark 
              ? 'bg-purple-950/30 border-purple-500/20' 
              : 'bg-orange-50/90 border-orange-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className={`text-base font-extrabold font-heading ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {exp.role}
              </h3>
              <div className={`text-xs font-bold flex items-center gap-1.5 mt-0.5 ${
                isDark ? 'text-purple-400' : 'text-orange-600'
              }`}>
                <Briefcase size={13} />
                <span>{exp.company}</span>
              </div>
            </div>
            <div className={`text-xs flex items-center gap-1 font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Calendar size={12} />
              <span>{exp.period}</span>
            </div>
          </div>

          <ul className={`space-y-1.5 pt-2 border-t ${
            isDark ? 'border-purple-500/15' : 'border-orange-200'
          }`}>
            {exp.achievements.map((ach, i) => (
              <li key={i} className={`flex items-start space-x-2 text-xs leading-relaxed font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <CheckCircle2 size={13} className={`shrink-0 mt-0.5 ${
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
