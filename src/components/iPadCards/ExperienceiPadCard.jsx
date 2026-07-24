import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ExperienceiPadCard({ isDark }) {
  const { experience } = portfolioData;

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-3">
        {experience.map((item, idx) => (
          <div 
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              isDark 
                ? 'bg-slate-900/60 border-purple-500/20' 
                : 'bg-white border-orange-200 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className={`text-sm font-extrabold font-heading ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {item.role}
                </h3>
                <div className={`text-xs font-bold flex items-center gap-1.5 mt-0.5 ${
                  isDark ? 'text-purple-400' : 'text-orange-600'
                }`}>
                  <Briefcase size={13} />
                  <span>{item.company}</span>
                </div>
              </div>

              <div className={`flex items-center space-x-3 text-xs font-mono font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <div className="flex items-center space-x-1">
                  <Calendar size={13} className={isDark ? "text-purple-400" : "text-orange-500"} />
                  <span>{item.period}</span>
                </div>
                {item.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin size={13} className={isDark ? "text-purple-400" : "text-orange-500"} />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            {item.description && (
              <p className={`text-xs mt-2 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
              }`}>
                {item.description}
              </p>
            )}

            {/* Achievements Bullet List */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {item.achievements.map((ach, i) => (
                  <div key={i} className={`flex items-start space-x-2 text-xs font-medium leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-purple-500/10">
                {item.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className={`text-xs px-2 py-0.5 rounded-lg font-mono font-bold border ${
                      isDark 
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                        : 'bg-orange-100 text-orange-900 border-orange-300/60'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
