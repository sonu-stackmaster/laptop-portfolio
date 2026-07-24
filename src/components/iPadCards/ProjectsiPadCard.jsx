import React, { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ProjectsiPadCard({ isDark }) {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(0);

  const activeProj = projects[selectedProject];

  return (
    <div className="space-y-4 text-left">
      {/* Project Selector Tabs */}
      <div className={`flex space-x-2 pb-2 overflow-x-auto border-b ${
        isDark ? 'border-purple-500/20' : 'border-orange-200'
      }`}>
        {projects.map((proj, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedProject(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedProject === idx
                ? isDark
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-orange-500 text-white shadow-md'
                : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-orange-100/60'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Selected Project Main Details */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark 
          ? 'bg-purple-950/30 border-purple-500/20' 
          : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-base font-extrabold font-heading flex items-center gap-2 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {activeProj.title}
              <Sparkles size={15} className={isDark ? "text-purple-400" : "text-orange-500"} />
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${
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
              className={`p-2 rounded-xl transition-all shrink-0 ${
                isDark 
                  ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white' 
                  : 'bg-orange-500/20 text-orange-700 hover:bg-orange-500 hover:text-white'
              }`}
              title="Visit Live Application"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Impact Highlights Grid */}
        <div className={`space-y-1.5 pt-2 border-t ${
          isDark ? 'border-purple-500/15' : 'border-orange-200'
        }`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            Key Tablet Highlights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeProj.highlights.map((h, i) => (
              <div key={i} className={`flex items-start space-x-2 text-xs font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {activeProj.tags.map((tag, i) => (
              <span 
                key={i} 
                className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg border ${
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
