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
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/80 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-400/30">
        {Object.keys(skills).map((category) => {
          const Icon = categoryIcons[category] || Code;
          const isActive = activeTab === category;

          return (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-indigo-600 light:from-orange-500 light:to-amber-500 text-white shadow-md'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon size={14} />
              <span>{category.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Skill Bars */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 dark:text-purple-400 light:text-orange-600 flex items-center justify-between">
          <span>{activeTab} Technologies</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-500 light:text-slate-600 uppercase font-mono">Proficiency</span>
        </h4>

        {skills[activeTab].map((skill, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
              <span>{skill.name}</span>
              <span className="font-mono text-purple-400 dark:text-purple-400 light:text-orange-600">{skill.level}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 dark:from-purple-500 dark:to-indigo-400 light:from-orange-500 light:to-amber-400 transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* All Tech Pills Summary */}
      <div className="pt-3 border-t border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/30">
        <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 mb-2">
          Tools & Ecosystem Highlights:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "LangChain", "PostgreSQL", "Redis", "WebRTC"].map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/60 dark:bg-purple-950/60 light:bg-orange-100/80 text-purple-300 dark:text-purple-300 light:text-orange-700 font-mono border border-purple-500/30 dark:border-purple-500/30 light:border-orange-300/50">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
