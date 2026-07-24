import React from 'react';
import { User, Code2, Award, Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function AboutCard({ isDark }) {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <div className="flex items-center space-x-4 pb-4 border-b border-purple-500/20 dark:border-purple-500/20 light:border-orange-500/20">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 dark:from-purple-600 dark:to-indigo-500 light:from-orange-500 light:to-amber-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            SK
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900" title="Available for hire" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-800 font-heading">
            {personalInfo.name}
          </h2>
          <p className="text-sm font-medium text-purple-400 dark:text-purple-400 light:text-orange-600">
            {personalInfo.title}
          </p>
          <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
            <MapPin size={12} className="text-purple-400 dark:text-purple-400 light:text-orange-500" />
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
        {personalInfo.summary}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {personalInfo.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-xl bg-purple-950/40 dark:bg-purple-950/40 light:bg-orange-100/60 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 transition-all hover:scale-105"
          >
            <div className="text-lg font-bold font-heading text-purple-300 dark:text-purple-300 light:text-orange-600">
              {stat.value}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Focus Badges */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 dark:text-purple-400 light:text-orange-600 mb-2 flex items-center gap-1.5">
          <Sparkles size={14} /> Core Expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Full-Stack Systems", "AI / LLM Solutions", "Cloud Microservices", "System Performance", "API Orchestration"].map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/10 dark:bg-purple-500/10 light:bg-orange-500/10 text-purple-300 dark:text-purple-300 light:text-orange-700 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-400/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
