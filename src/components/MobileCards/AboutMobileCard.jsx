import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function AboutMobileCard({ isDark }) {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-3 text-left">
      {/* Header Profile Section */}
      <div className={`flex items-center space-x-3 pb-3 border-b ${
        isDark ? 'border-purple-500/20' : 'border-orange-200'
      }`}>
        <div className="relative shrink-0">
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            className={`w-12 h-12 rounded-xl object-cover shadow-md border ${
              isDark ? 'border-purple-500/50' : 'border-orange-400/60'
            }`}
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900" title="Available for hire" />
        </div>
        <div className="overflow-hidden">
          <h2 className={`text-sm font-extrabold font-heading truncate ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {personalInfo.name}
          </h2>
          <p className={`text-[11px] font-semibold truncate ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            {personalInfo.title}
          </p>
          <div className={`flex items-center space-x-1 mt-0.5 text-[10px] ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <MapPin size={11} className={isDark ? "text-purple-400" : "text-orange-500"} />
            <span className="truncate">{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className={`text-xs leading-relaxed ${
        isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
      }`}>
        {personalInfo.summary}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {personalInfo.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-2.5 rounded-xl border ${
              isDark 
                ? 'bg-purple-950/40 border-purple-500/20' 
                : 'bg-orange-50/90 border-orange-200 shadow-xs'
            }`}
          >
            <div className={`text-sm font-extrabold font-heading ${
              isDark ? 'text-purple-300' : 'text-orange-600'
            }`}>
              {stat.value}
            </div>
            <div className={`text-[10px] ${
              isDark ? 'text-slate-400' : 'text-slate-700 font-medium'
            }`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Focus Badges */}
      <div>
        <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Sparkles size={12} /> Core Expertise
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {["Full-Stack", "AI / LLM", "Cloud Infra", "Performance", "APIs"].map((tag, i) => (
            <span 
              key={i} 
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                isDark 
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                  : 'bg-orange-100 text-orange-900 border-orange-300/60'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
