import React, { useState } from 'react';
import { Compass, ExternalLink, Github, Linkedin, Globe, Search, ArrowRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function SafariMobileApp({ isDark }) {
  const { personalInfo } = portfolioData;
  const [url, setUrl] = useState('https://github.com/sonu-stackmaster');

  const bookmarks = [
    { title: "GitHub Profile", url: personalInfo.github, icon: Github, color: 'bg-slate-800 text-white' },
    { title: "LinkedIn Profile", url: personalInfo.linkedin, icon: Linkedin, color: 'bg-blue-600 text-white' },
    { title: "Resume PDF", url: "/docs/Sonu-CV.pdf", icon: Globe, color: 'bg-rose-600 text-white' },
    { title: "Email Inquiry", url: `mailto:${personalInfo.email}`, icon: Compass, color: 'bg-purple-600 text-white' }
  ];

  const handleOpenUrl = (targetUrl) => {
    setUrl(targetUrl);
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="space-y-3 text-left">
      {/* Safari Address Bar */}
      <div className={`p-2 rounded-2xl border flex items-center space-x-2 ${
        isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-white border-orange-300 shadow-xs'
      }`}>
        <Search size={14} className={isDark ? "text-slate-400" : "text-slate-500"} />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`flex-1 text-[11px] font-mono border-none focus:outline-none bg-transparent ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}
        />
        <button 
          onClick={() => handleOpenUrl(url)}
          className={`p-1 rounded-lg ${isDark ? 'text-purple-400' : 'text-orange-600'}`}
        >
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Bookmarks Grid */}
      <div className="space-y-2">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          Safari Favorites & Bookmarks
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {bookmarks.map((bm, idx) => {
            const Icon = bm.icon;
            return (
              <button
                key={idx}
                onClick={() => handleOpenUrl(bm.url)}
                className={`p-2.5 rounded-xl border flex items-center space-x-2 text-left transition-transform active:scale-95 ${
                  isDark
                    ? 'bg-purple-950/30 border-purple-500/20 hover:border-purple-400'
                    : 'bg-orange-50/90 border-orange-200 shadow-xs hover:bg-orange-100'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg ${bm.color} flex items-center justify-center shrink-0`}>
                  <Icon size={14} />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-[11px] font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {bm.title}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate flex items-center gap-0.5">
                    <span>Visit</span>
                    <ExternalLink size={8} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Quick Preview Card */}
      <div className={`p-3 rounded-2xl border space-y-2 ${
        isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe size={14} className={isDark ? "text-purple-400" : "text-orange-500"} />
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Featured Code Repositories
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-500 font-bold">● LIVE</span>
        </div>
        <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Explore 20+ production grade open-source repositories and cloud microservices on Sonu&apos;s official GitHub.
        </p>
        <button
          onClick={() => handleOpenUrl(personalInfo.github)}
          className={`w-full py-1.5 rounded-lg text-xs font-bold text-white shadow-xs flex items-center justify-center space-x-1.5 ${
            isDark ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-orange-500 to-amber-500'
          }`}
        >
          <Github size={14} />
          <span>Open GitHub in Browser</span>
        </button>
      </div>
    </div>
  );
}
