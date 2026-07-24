import React from 'react';
import { Download, FileText, Eye, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeMobileCard({ isDark }) {
  const handleDownload = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: isDark ? ['#8b5cf6', '#a855f7'] : ['#f97316', '#fb923c']
    });

    const link = document.createElement('a');
    link.href = '/docs/Sonu-CV.pdf';
    link.download = 'Sonu-Kumar-Kapar-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3 text-left">
      {/* Action Bar */}
      <div className={`p-3 rounded-xl border space-y-2.5 ${
        isDark 
          ? 'bg-purple-950/40 border-purple-500/20' 
          : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-lg text-white shrink-0 ${
            isDark ? 'bg-purple-600' : 'bg-orange-500'
          }`}>
            <FileText size={18} />
          </div>
          <div>
            <h3 className={`text-xs font-extrabold font-heading ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Sonu_Kumar_Kapar_CV.pdf
            </h3>
            <p className={`text-[10px] ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Verified Resume • 4+ Yrs Exp
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2 pt-1">
          <a
            href="/docs/Sonu-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center space-x-1 border ${
              isDark 
                ? 'bg-slate-800 text-slate-200 border-purple-500/30 hover:bg-slate-700' 
                : 'bg-white text-slate-800 border-orange-300 hover:bg-orange-100/80 shadow-xs'
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </a>

          <button
            onClick={handleDownload}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-xs transition-all flex items-center justify-center space-x-1 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
          >
            <Download size={13} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Highlights List */}
      <div className={`p-3 rounded-xl border space-y-2 ${
        isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        <div className={`text-[10px] font-bold uppercase tracking-wider ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          Resume Summary
        </div>
        {[
          "4+ Years Senior Full Stack & AI Experience",
          "Node.js, React, Next.js, Python & Cloud Infra",
          "Delivered 20+ Production Grade Systems",
          "LLM Integration & Autonomous Agents Specialist"
        ].map((item, idx) => (
          <div key={idx} className={`flex items-start space-x-1.5 text-[11px] font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-800'
          }`}>
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
