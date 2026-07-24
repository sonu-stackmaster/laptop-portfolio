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
        <div className="p-2.5 rounded-xl bg-purple-950/30 dark:bg-purple-950/30 light:bg-orange-50/80 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="p-1.5 rounded-lg bg-purple-500/10 dark:bg-purple-500/10 light:bg-orange-500/10 text-purple-400 dark:text-purple-400 light:text-orange-600">
              <Mail size={16} />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600">Email</div>
              <div className="text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-900 truncate">{personalInfo.email}</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.email, 'email')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-all shrink-0"
            title="Copy Email"
          >
            {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Phone */}
        <div className="p-2.5 rounded-xl bg-purple-950/30 dark:bg-purple-950/30 light:bg-orange-50/80 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="p-1.5 rounded-lg bg-purple-500/10 dark:bg-purple-500/10 light:bg-orange-500/10 text-purple-400 dark:text-purple-400 light:text-orange-600">
              <Phone size={16} />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600">Phone</div>
              <div className="text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-900 truncate">{personalInfo.phone}</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.phone, 'phone')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-all shrink-0"
            title="Copy Phone"
          >
            {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="flex space-x-2">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="flex-1 p-2 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/70 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 flex items-center justify-center space-x-2 text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-purple-500 transition-all"
        >
          <Github size={15} />
          <span>GitHub</span>
        </a>
        <a
          href={personalInfo.leetcode}
          target="_blank"
          rel="noreferrer"
          className="flex-1 p-2 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/70 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/40 flex items-center justify-center space-x-2 text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-purple-500 transition-all"
        >
          <Code size={15} />
          <span>LeetCode</span>
        </a>
      </div>

      {/* Quick Message Form */}
      <form onSubmit={handleSubmit} className="space-y-2 pt-2 border-t border-purple-500/15 dark:border-purple-500/15 light:border-orange-200">
        <div className="text-xs font-semibold text-purple-400 dark:text-purple-400 light:text-orange-600 flex items-center gap-1.5">
          <Sparkles size={14} /> Send Quick Message
        </div>

        {messageSent ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium text-center">
            ✨ Thank you! Message dispatched successfully to Sonu.
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/50 focus:outline-none focus:border-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/50 focus:outline-none focus:border-purple-500"
            />
            <textarea
              placeholder="Message details..."
              rows={2}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 border border-purple-500/20 dark:border-purple-500/20 light:border-orange-300/50 focus:outline-none focus:border-purple-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-indigo-600 light:from-orange-500 light:to-amber-500 text-white shadow-md hover:scale-[1.02] transition-all flex items-center justify-center space-x-1.5"
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
