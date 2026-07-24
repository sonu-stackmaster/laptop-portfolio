import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ExperienceCard({ isDark }) {
  const { experience } = portfolioData;

  return (
    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
      {experience.map((exp, idx) => (
        <div 
          key={idx}
          className="p-4 rounded-xl bg-purple-950/30 dark:bg-purple-950/30 light:bg-orange-50/80 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 space-y-2 relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-heading">
                {exp.role}
              </h3>
              <div className="text-xs font-semibold text-purple-400 dark:text-purple-400 light:text-orange-600 flex items-center gap-1.5 mt-0.5">
                <Briefcase size={13} />
                <span>{exp.company}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center gap-1">
              <Calendar size={12} />
              <span>{exp.period}</span>
            </div>
          </div>

          <ul className="space-y-1.5 pt-2 border-t border-purple-500/15 dark:border-purple-500/15 light:border-orange-200">
            {exp.achievements.map((ach, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                <CheckCircle2 size={13} className="text-purple-400 dark:text-purple-400 light:text-orange-500 shrink-0 mt-0.5" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
