import React, { useState } from 'react';
import { Cpu, Code, Database, Cloud, Bot, Workflow } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

const categoryIcons = {
  "Frontend": Code,
  "Backend": Cpu,
  "Databases & Cache": Database,
  "AI / ML & Agents": Bot,
  "Cloud & DevOps": Cloud,
  "Automation & Realtime": Workflow
};

export default function SkillsCard({ isDark }) {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className={`flex flex-wrap gap-1.5 p-1.5 rounded-xl border ${
        isDark 
          ? 'bg-slate-900/60 border-purple-500/20' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        {Object.keys(skills).map((category) => {
          const Icon = categoryIcons[category] || Code;
          const isActive = activeTab === category;

          return (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-orange-100/60'
              }`}
            >
              <Icon size={14} />
              <span>{category.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Skill Bars */}
      <div className="space-y-3.5 pt-2">
        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <span>{activeTab} Technologies</span>
          <span className={`text-[10px] uppercase font-mono ${
            isDark ? 'text-slate-500' : 'text-slate-600 font-bold'
          }`}>Proficiency</span>
        </h4>

        {skills[activeTab].map((skill, idx) => (
          <div key={idx} className="space-y-1">
            <div className={`flex justify-between text-xs font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              <span>{skill.name}</span>
              <span className={`font-mono ${
                isDark ? 'text-purple-400' : 'text-orange-600 font-extrabold'
              }`}>{skill.level}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-slate-800' : 'bg-orange-100'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-400' 
                    : 'bg-gradient-to-r from-orange-500 to-amber-500'
                }`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* All Tech Pills Summary */}
      <div className={`pt-3 border-t ${
        isDark ? 'border-purple-500/20' : 'border-orange-200'
      }`}>
        <div className={`text-[11px] font-semibold mb-2 ${
          isDark ? 'text-slate-400' : 'text-slate-700'
        }`}>
          Tools & Ecosystem Highlights:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "LangChain", "PostgreSQL", "Redis", "WebRTC"].map((t, i) => (
            <span 
              key={i} 
              className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold border ${
                isDark 
                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/30' 
                  : 'bg-orange-100 text-orange-900 border-orange-300/60'
              }`}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
