import React, { useState } from 'react';
import { Download, FileText, Check, ExternalLink, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ResumeiPadCard({ isDark }) {
  const { personalInfo } = portfolioData;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
    const link = document.createElement('a');
    link.href = '/docs/Sonu-CV.pdf';
    link.download = 'Sonu-Kumar-Kapar-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Resume Card Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
            isDark ? 'bg-purple-600' : 'bg-orange-500'
          }`}>
            <FileText size={24} />
          </div>
          <div>
            <h3 className={`text-sm font-extrabold font-heading ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {personalInfo.name} - Resume PDF
            </h3>
            <p className={`text-xs font-mono font-bold ${
              isDark ? 'text-purple-400' : 'text-orange-600'
            }`}>
              Senior Full Stack & AI Developer (iPad Edition)
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 shrink-0 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
          }`}
        >
          {downloaded ? <Check size={16} /> : <Download size={16} />}
          <span>{downloaded ? 'Downloading...' : 'Download PDF'}</span>
        </button>
      </div>

      {/* Resume Highlights Section */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Sparkles size={14} /> Resume Executive Overview
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-orange-50'}`}>
            <div className="font-bold text-emerald-500 mb-1">TECHNICAL SKILLS</div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              React, Node.js, TypeScript, Python, AWS, Docker, AI Agents, PostgreSQL, Redis, System Architecture.
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-orange-50'}`}>
            <div className="font-bold text-emerald-500 mb-1">CAREER HIGHLIGHTS</div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              4+ years experience, 20+ production systems delivered, 99.9% availability cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
