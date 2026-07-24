import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ProjectsCard({ isDark }) {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(0);

  const activeProj = projects[selectedProject];

  return (
    <div className="space-y-4">
      {/* Project Selector Tabs */}
      <div className="flex space-x-2 border-b border-purple-500/20 dark:border-purple-500/20 light:border-orange-500/20 pb-2 overflow-x-auto">
        {projects.map((proj, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedProject(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedProject === idx
                ? 'bg-purple-600 dark:bg-purple-600 light:bg-orange-500 text-white shadow-md'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Selected Project Main Details */}
      <div className="p-4 rounded-xl bg-purple-950/30 dark:bg-purple-950/30 light:bg-orange-50/80 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-heading flex items-center gap-2">
              {activeProj.title}
              <Sparkles size={16} className="text-purple-400 dark:text-purple-400 light:text-orange-500" />
            </h3>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
              {activeProj.description}
            </p>
          </div>
          {activeProj.url !== '#' && (
            <a
              href={activeProj.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-purple-600/20 dark:bg-purple-600/20 light:bg-orange-500/20 text-purple-300 dark:text-purple-300 light:text-orange-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 light:hover:bg-orange-500 transition-all"
              title="Visit Live Application"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Impact Bullet Points */}
        <div className="space-y-1.5 pt-2 border-t border-purple-500/15 dark:border-purple-500/15 light:border-orange-200">
          <div className="text-[11px] font-semibold text-purple-400 dark:text-purple-400 light:text-orange-600 uppercase tracking-wider">
            Key Impact & Metrics
          </div>
          {activeProj.highlights.map((h, i) => (
            <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-800">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">
            Technologies Used:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeProj.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-purple-500/10 dark:bg-purple-500/10 light:bg-orange-500/10 text-purple-300 dark:text-purple-300 light:text-orange-700 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40"
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
