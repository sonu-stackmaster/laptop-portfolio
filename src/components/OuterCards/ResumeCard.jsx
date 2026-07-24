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
      <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 dark:bg-purple-950/40 light:bg-orange-100/60 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-600 dark:bg-purple-600 light:bg-orange-500 text-white">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-heading">
              docs/Sonu-CV.pdf
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              Verified Senior Developer Resume
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/docs/Sonu-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Eye size={14} />
            <span>Open PDF</span>
          </a>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-indigo-600 light:from-orange-500 light:to-amber-500 text-white shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* PDF Embedded Preview Frame */}
      <div className="w-full h-[280px] rounded-xl overflow-hidden border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 bg-slate-900/80">
        <iframe 
          src="/docs/Sonu-CV.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full h-full"
          title="Sonu CV Preview"
        />
      </div>
    </div>
  );
}
