import React, { useState } from 'react';
import { Mail, Phone, Github, Code, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export default function ContactCard({ isDark }) {
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

    setMessageSent(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: isDark ? ['#8b5cf6', '#a855f7'] : ['#f97316', '#fb923c']
    });

    setTimeout(() => {
      setMessageSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-4">
      {/* Quick Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Email */}
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
          isDark 
            ? 'bg-purple-950/30 border-purple-500/20' 
            : 'bg-orange-50/90 border-orange-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className={`p-1.5 rounded-lg ${
              isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-orange-500/10 text-orange-600'
            }`}>
              <Mail size={16} />
            </div>
            <div className="truncate">
              <div className={`text-[10px] uppercase font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Email</div>
              <div className={`text-xs font-mono font-bold truncate ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}>{personalInfo.email}</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.email, 'email')}
            className={`p-1.5 rounded-lg transition-all shrink-0 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-orange-100'
            }`}
            title="Copy Email"
          >
            {copiedField === 'email' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Phone */}
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
          isDark 
            ? 'bg-purple-950/30 border-purple-500/20' 
            : 'bg-orange-50/90 border-orange-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className={`p-1.5 rounded-lg ${
              isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-orange-500/10 text-orange-600'
            }`}>
              <Phone size={16} />
            </div>
            <div className="truncate">
              <div className={`text-[10px] uppercase font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Phone</div>
              <div className={`text-xs font-mono font-bold truncate ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}>{personalInfo.phone}</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.phone, 'phone')}
            className={`p-1.5 rounded-lg transition-all shrink-0 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-orange-100'
            }`}
            title="Copy Phone"
          >
            {copiedField === 'phone' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="flex space-x-2">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 p-2 rounded-xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
            isDark 
              ? 'bg-slate-900/60 border-purple-500/20 text-slate-200 hover:border-purple-500' 
              : 'bg-white border-orange-200 text-slate-900 hover:bg-orange-50 shadow-sm'
          }`}
        >
          <Github size={15} />
          <span>GitHub</span>
        </a>
        <a
          href={personalInfo.leetcode}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 p-2 rounded-xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
            isDark 
              ? 'bg-slate-900/60 border-purple-500/20 text-slate-200 hover:border-purple-500' 
              : 'bg-white border-orange-200 text-slate-900 hover:bg-orange-50 shadow-sm'
          }`}
        >
          <Code size={15} />
          <span>LeetCode</span>
        </a>
      </div>

      {/* Quick Message Form */}
      <form onSubmit={handleSubmit} className={`space-y-2 pt-2 border-t ${
        isDark ? 'border-purple-500/15' : 'border-orange-200'
      }`}>
        <div className={`text-xs font-bold flex items-center gap-1.5 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Sparkles size={14} /> Send Quick Message
        </div>

        {messageSent ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center">
            ✨ Thank you! Message dispatched successfully to Sonu.
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
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
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-900/80 text-slate-100 border-purple-500/20 focus:border-purple-500' 
                  : 'bg-white text-slate-900 border-orange-200 focus:border-orange-500 shadow-xs'
              }`}
            />
            <textarea
              placeholder="Message details..."
              rows={2}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors resize-none ${
                isDark 
                  ? 'bg-slate-900/80 text-slate-100 border-purple-500/20 focus:border-purple-500' 
                  : 'bg-white text-slate-900 border-orange-200 focus:border-orange-500 shadow-xs'
              }`}
            />
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-all flex items-center justify-center space-x-1.5 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}
            >
              <Send size={13} />
              <span>Send Message</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
}
