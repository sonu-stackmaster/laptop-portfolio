import React, { useState } from 'react';
import { Compass, ExternalLink, Github, Linkedin, Globe, Search, ArrowRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function SafariiPadCard({ isDark }) {
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
    <div className="space-y-4 text-left">
      <div className={`p-2.5 rounded-xl border flex items-center space-x-2 ${
        isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-white border-orange-300 shadow-xs'
      }`}>
        <Search size={15} className={isDark ? "text-slate-400" : "text-slate-500"} />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`flex-1 text-xs font-mono border-none focus:outline-none bg-transparent ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}
        />
        <button 
          onClick={() => handleOpenUrl(url)}
          className={`p-1.5 rounded-lg ${isDark ? 'text-purple-400 hover:text-white' : 'text-orange-600'}`}
        >
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="space-y-2">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          iPadOS Safari Favorites
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          {bookmarks.map((bm, idx) => {
            const Icon = bm.icon;
            return (
              <button
                key={idx}
                onClick={() => handleOpenUrl(bm.url)}
                className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-all hover:scale-[1.02] ${
                  isDark
                    ? 'bg-purple-950/30 border-purple-500/20 hover:border-purple-400'
                    : 'bg-orange-50/90 border-orange-200 shadow-xs hover:bg-orange-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${bm.color} flex items-center justify-center shrink-0`}>
                  <Icon size={16} />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {bm.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate flex items-center gap-0.5 mt-0.5">
                    <span>Open Web</span>
                    <ExternalLink size={9} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
