import React from 'react';
import { Notebook, CheckSquare, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function NotesDesktopCard({ isDark }) {
  const { personalInfo } = portfolioData;

  const notes = [
    { title: "Engineering Philosophy", text: "Build systems end-to-end with high resilience, microsecond latency, and seamless scalability." },
    { title: "AI & Microservices", text: "Integrate LLM agents, vector embeddings, and event-driven architecture into business-critical workflows." },
    { title: "Clean Code & Quality", text: "Prioritize strict type checking, comprehensive unit testing, and modular component architecture." }
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Header Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center space-x-3 ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${
          isDark ? 'bg-amber-600' : 'bg-amber-500'
        }`}>
          <Notebook size={20} />
        </div>
        <div>
          <h3 className={`text-xs font-extrabold font-heading ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            macOS Quick Notes
          </h3>
          <p className={`text-[10px] font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            Sonu&apos;s Engineering Notes & Principles
          </p>
        </div>
      </div>

      {/* Sticky Notes Cards */}
      <div className="space-y-2.5">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border space-y-1 ${
              isDark
                ? 'bg-slate-900/70 border-purple-500/20'
                : 'bg-amber-50/70 border-amber-200 shadow-xs'
            }`}
          >
            <h4 className={`text-xs font-bold font-heading flex items-center gap-1.5 ${
              isDark ? 'text-amber-300' : 'text-amber-900'
            }`}>
              <CheckSquare size={14} className="text-amber-500 shrink-0" />
              <span>{note.title}</span>
            </h4>
            <p className={`text-xs leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
            }`}>
              {note.text}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Summary Pill */}
      <div className={`p-3 rounded-xl border text-xs font-mono flex items-center space-x-2 ${
        isDark ? 'bg-purple-950/20 border-purple-500/15 text-purple-300' : 'bg-white border-orange-200 text-orange-800 shadow-xs'
      }`}>
        <Sparkles size={14} className="text-emerald-500 shrink-0" />
        <span>Status: Open for Full Stack & AI Leadership Roles</span>
      </div>
    </div>
  );
}
