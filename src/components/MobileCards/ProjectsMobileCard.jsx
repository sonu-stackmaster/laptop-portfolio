import React, { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ProjectsMobileCard({ isDark }) {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(0);

  const activeProj = projects[selectedProject];

  return (
    <div className="space-y-3 text-left">
      {/* Project Selector Horizontal Scroll */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <div className="flex space-x-1.5 min-w-max">
          {projects.map((proj, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProject(idx)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                selectedProject === idx
                  ? isDark
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-orange-500 text-white shadow-xs'
                  : isDark
                    ? 'bg-slate-900/60 text-slate-400 border border-purple-500/20'
                    : 'bg-orange-50 text-slate-700 border border-orange-200'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Main Details */}
      <div className={`p-3 rounded-xl border space-y-2.5 ${
        isDark 
          ? 'bg-purple-950/30 border-purple-500/20' 
          : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-sm font-extrabold font-heading flex items-center gap-1.5 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {activeProj.title}
              <Sparkles size={13} className={isDark ? "text-purple-400" : "text-orange-500"} />
            </h3>
            <p className={`text-[11px] mt-1 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
            }`}>
              {activeProj.description}
            </p>
          </div>
          {activeProj.url !== '#' && (
            <a
              href={activeProj.url}
              target="_blank"
              rel="noreferrer"
              className={`p-1.5 rounded-md transition-all shrink-0 ${
                isDark 
                  ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white' 
                  : 'bg-orange-500/20 text-orange-700 hover:bg-orange-500 hover:text-white'
              }`}
              title="Visit Live Application"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Impact Bullet Points */}
        <div className={`space-y-1 pt-2 border-t ${
          isDark ? 'border-purple-500/15' : 'border-orange-200'
        }`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            Key Highlights
          </div>
          {activeProj.highlights.map((h, i) => (
            <div key={i} className={`flex items-start space-x-1.5 text-[11px] font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1">
            {activeProj.tags.map((tag, i) => (
              <span 
                key={i} 
                className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded border ${
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
    </div>
  );
}
