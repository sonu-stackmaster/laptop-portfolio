import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export default function ContactMobileCard({ isDark }) {
  const { personalInfo } = portfolioData;
  const [copiedField, setCopiedField] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(`Hi Sonu,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');

    setMessageSent(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: isDark ? ['#8b5cf6', '#a855f7'] : ['#f97316', '#fb923c']
    });

    setTimeout(() => {
      setMessageSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-3 text-left">
      {/* Quick Contact Links */}
      <div className="space-y-1.5">
        {/* Email */}
        <div className={`p-2 rounded-xl border flex items-center justify-between ${
          isDark 
            ? 'bg-purple-950/30 border-purple-500/20' 
            : 'bg-orange-50/90 border-orange-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className={`p-1 rounded-lg shrink-0 ${
              isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-orange-500/10 text-orange-600'
            }`}>
              <Mail size={14} />
            </div>
            <div className="truncate">
              <div className={`text-[9px] uppercase font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Email</div>
              <a 
                href={`mailto:${personalInfo.email}`}
                className={`text-[11px] font-mono font-bold truncate block hover:underline ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.email, 'email')}
            className={`p-1 rounded-md transition-all shrink-0 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {copiedField === 'email' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>

        {/* Phone */}
        <div className={`p-2 rounded-xl border flex items-center justify-between ${
          isDark 
            ? 'bg-purple-950/30 border-purple-500/20' 
            : 'bg-orange-50/90 border-orange-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className={`p-1 rounded-lg shrink-0 ${
              isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-orange-500/10 text-orange-600'
            }`}>
              <Phone size={14} />
            </div>
            <div className="truncate">
              <div className={`text-[9px] uppercase font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Phone</div>
              <a 
                href={`tel:${personalInfo.phone}`}
                className={`text-[11px] font-mono font-bold truncate block hover:underline ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                {personalInfo.phone}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.phone, 'phone')}
            className={`p-1 rounded-md transition-all shrink-0 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {copiedField === 'phone' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="flex space-x-1.5">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center space-x-1 text-[11px] font-bold transition-all ${
            isDark 
              ? 'bg-slate-900/60 border-purple-500/20 text-slate-200' 
              : 'bg-white border-orange-200 text-slate-900 shadow-xs'
          }`}
        >
          <Github size={13} />
          <span>GitHub</span>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 py-1.5 rounded-lg border flex items-center justify-center space-x-1 text-[11px] font-bold transition-all ${
            isDark 
              ? 'bg-slate-900/60 border-purple-500/20 text-slate-200' 
              : 'bg-white border-orange-200 text-slate-900 shadow-xs'
          }`}
        >
          <Linkedin size={13} />
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Quick Message Form */}
      <form onSubmit={handleSubmit} className={`space-y-1.5 pt-2 border-t ${
        isDark ? 'border-purple-500/15' : 'border-orange-200'
      }`}>
        <div className={`text-[11px] font-bold flex items-center gap-1 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Sparkles size={12} /> Direct Message
        </div>

        {messageSent ? (
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold text-center">
            ✨ Mail client opened!
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium border focus:outline-none ${
                isDark 
                  ? 'bg-slate-900/80 text-slate-100 border-purple-500/20 focus:border-purple-500' 
                  : 'bg-white text-slate-900 border-orange-200 focus:border-orange-500 shadow-xs'
              }`}
            />
            <input
              type="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium border focus:outline-none ${
                isDark 
                  ? 'bg-slate-900/80 text-slate-100 border-purple-500/20 focus:border-purple-500' 
                  : 'bg-white text-slate-900 border-orange-200 focus:border-orange-500 shadow-xs'
              }`}
            />
            <textarea
              placeholder="Message..."
              rows={2}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium border focus:outline-none resize-none ${
                isDark 
                  ? 'bg-slate-900/80 text-slate-100 border-purple-500/20 focus:border-purple-500' 
                  : 'bg-white text-slate-900 border-orange-200 focus:border-orange-500 shadow-xs'
              }`}
            />
            <button
              type="submit"
              className={`w-full py-1.5 rounded-lg text-[11px] font-bold text-white shadow-xs flex items-center justify-center space-x-1 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}
            >
              <Send size={12} />
              <span>Send Message</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
}
