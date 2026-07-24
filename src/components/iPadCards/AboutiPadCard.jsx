import React from 'react';
import { MapPin, Sparkles, Award, Code2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function AboutiPadCard({ isDark }) {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-4 text-left">
      {/* Header Profile Section */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="relative shrink-0">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              className={`w-16 h-16 rounded-2xl object-cover shadow-lg border-2 ${
                isDark ? 'border-purple-500/50' : 'border-orange-400/60'
              }`}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" title="Available for hire" />
          </div>
          <div>
            <h2 className={`text-base font-extrabold font-heading ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {personalInfo.name}
            </h2>
            <p className={`text-xs font-semibold ${
              isDark ? 'text-purple-400' : 'text-orange-600'
            }`}>
              {personalInfo.title}
            </p>
            <div className={`flex items-center space-x-1.5 mt-1 text-xs ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <MapPin size={13} className={isDark ? "text-purple-400" : "text-orange-500"} />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>

        <div className={`hidden sm:flex flex-col items-end px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
          isDark ? 'bg-purple-900/30 border-purple-500/30 text-purple-300' : 'bg-white border-orange-300 text-orange-800'
        }`}>
          <span>iPadOS 18 Pro</span>
          <span className="text-[10px] text-emerald-500">● 4+ Yrs Exp</span>
        </div>
      </div>

      {/* Summary */}
      <p className={`text-xs leading-relaxed ${
        isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
      }`}>
        {personalInfo.summary}
      </p>

      {/* Tablet 4-Column Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {personalInfo.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-xl border transition-all hover:scale-[1.02] ${
              isDark 
                ? 'bg-slate-900/70 border-purple-500/20' 
                : 'bg-white border-orange-200 shadow-xs'
            }`}
          >
            <div className={`text-base font-extrabold font-heading ${
              isDark ? 'text-purple-300' : 'text-orange-600'
            }`}>
              {stat.value}
            </div>
            <div className={`text-[11px] ${
              isDark ? 'text-slate-400' : 'text-slate-700 font-medium'
            }`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Focus Badges */}
      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Sparkles size={14} /> Tablet Core Expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Full-Stack Systems", "AI / LLM Solutions", "Cloud Microservices", "System Performance", "API Orchestration"].map((tag, i) => (
            <span 
              key={i} 
              className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
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
