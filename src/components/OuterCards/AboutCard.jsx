import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function AboutCard({ isDark }) {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <div className={`flex items-center space-x-4 pb-4 border-b ${
        isDark ? 'border-purple-500/20' : 'border-orange-200'
      }`}>
        <div className="relative">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-lg ${
            isDark 
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-500' 
              : 'bg-gradient-to-tr from-orange-500 to-amber-500'
          }`}>
            SK
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" title="Available for hire" />
        </div>
        <div>
          <h2 className={`text-xl font-bold font-heading ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {personalInfo.name}
          </h2>
          <p className={`text-sm font-semibold ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            {personalInfo.title}
          </p>
          <div className={`flex items-center space-x-2 mt-1 text-xs ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <MapPin size={13} className={isDark ? "text-purple-400" : "text-orange-500"} />
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className={`text-sm leading-relaxed ${
        isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
      }`}>
        {personalInfo.summary}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {personalInfo.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-3.5 rounded-xl border transition-all hover:scale-105 ${
              isDark 
                ? 'bg-purple-950/40 border-purple-500/20' 
                : 'bg-orange-50/90 border-orange-200 shadow-sm'
            }`}
          >
            <div className={`text-xl font-extrabold font-heading ${
              isDark ? 'text-purple-300' : 'text-orange-600'
            }`}>
              {stat.value}
            </div>
            <div className={`text-xs ${
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
          <Sparkles size={14} /> Core Expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Full-Stack Systems", "AI / LLM Solutions", "Cloud Microservices", "System Performance", "API Orchestration"].map((tag, i) => (
            <span 
              key={i} 
              className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
                isDark 
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                  : 'bg-orange-100/80 text-orange-900 border-orange-300/60 shadow-xs'
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
