import React from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeCard({ isDark }) {
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: isDark ? ['#8b5cf6', '#a855f7', '#ec4899'] : ['#f97316', '#fb923c', '#eab308']
    });

    const link = document.createElement('a');
    link.href = '/docs/Sonu-CV.pdf';
    link.download = 'Sonu-Kumar-Kapar-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className={`flex items-center justify-between p-3 rounded-xl border ${
        isDark 
          ? 'bg-purple-950/40 border-purple-500/20' 
          : 'bg-orange-50/90 border-orange-200 shadow-sm'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg text-white ${
            isDark ? 'bg-purple-600' : 'bg-orange-500'
          }`}>
            <FileText size={20} />
          </div>
          <div>
            <h3 className={`text-sm font-bold font-heading ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              docs/Sonu-CV.pdf
            </h3>
            <p className={`text-xs ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Verified Senior Developer Resume
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/docs/Sonu-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isDark 
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' 
                : 'bg-white text-slate-900 border border-orange-300 hover:bg-orange-100/60 shadow-xs'
            }`}
          >
            <Eye size={14} />
            <span>Open PDF</span>
          </a>
          <button
            onClick={handleDownload}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md hover:scale-105 transition-all flex items-center gap-1.5 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
          >
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* PDF Embedded Preview Frame */}
      <div className={`w-full h-[280px] rounded-xl overflow-hidden border ${
        isDark 
          ? 'border-purple-500/20 bg-slate-900/80' 
          : 'border-orange-200 bg-white shadow-inner'
      }`}>
        <iframe 
          src="/docs/Sonu-CV.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full h-full"
          title="Sonu CV Preview"
        />
      </div>
    </div>
  );
}
