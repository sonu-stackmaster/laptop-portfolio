import React from 'react';
import { Notebook, CheckSquare, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function NotesiPadCard({ isDark }) {
  const { personalInfo } = portfolioData;

  const notes = [
    { title: "iPad Engineering Notes", text: "Build responsive, high-performance web systems with 3D WebGL interfaces and clean micro-interactions." },
    { title: "AI & Full Stack", text: "Architect LLM microservices, real-time WebSockets gateways, and scalable cloud infrastructure." },
    { title: "Tablet UI Strategy", text: "Optimized touch targets, responsive split view layouts, and custom glassmorphism design systems." }
  ];

  return (
    <div className="space-y-4 text-left">
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
            iPadOS Quick Notes
          </h3>
          <p className={`text-[10px] font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            Sonu&apos;s iPad Architecture Notes
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border space-y-1 ${
              isDark ? 'bg-slate-900/70 border-purple-500/20' : 'bg-amber-50/70 border-amber-200 shadow-xs'
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
    </div>
  );
}
