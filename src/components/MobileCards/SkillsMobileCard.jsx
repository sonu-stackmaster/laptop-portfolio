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

export default function SkillsMobileCard({ isDark }) {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <div className="space-y-3 text-left">
      {/* Category Horizontal Scrollable Pills */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <div className="flex space-x-1.5 min-w-max">
          {Object.keys(skills).map((category) => {
            const Icon = categoryIcons[category] || Code;
            const isActive = activeTab === category;

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                    : isDark
                      ? 'bg-slate-900/60 text-slate-400 border border-purple-500/20'
                      : 'bg-orange-50 text-slate-700 border border-orange-200'
                }`}
              >
                <Icon size={12} />
                <span>{category.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Skill Bars */}
      <div className="space-y-2.5 pt-1">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-between ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <span>{activeTab}</span>
          <span className="font-mono text-[9px]">Proficiency</span>
        </h4>

        {skills[activeTab].map((skill, idx) => (
          <div key={idx} className="space-y-0.5">
            <div className={`flex justify-between text-[11px] font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              <span>{skill.name}</span>
              <span className={`font-mono ${
                isDark ? 'text-purple-400' : 'text-orange-600 font-extrabold'
              }`}>{skill.level}%</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${
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
      <div className={`pt-2 border-t ${
        isDark ? 'border-purple-500/20' : 'border-orange-200'
      }`}>
        <div className={`text-[10px] font-semibold mb-1.5 ${
          isDark ? 'text-slate-400' : 'text-slate-700'
        }`}>
          Ecosystem:
        </div>
        <div className="flex flex-wrap gap-1">
          {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "LangChain", "PostgreSQL"].map((t, i) => (
            <span 
              key={i} 
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold border ${
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
