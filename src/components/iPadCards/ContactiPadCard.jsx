import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ContactiPadCard({ isDark }) {
  const { personalInfo } = portfolioData;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Direct Contacts Column */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            Get In Touch
          </h4>

          <a 
            href={`mailto:${personalInfo.email}`}
            className={`p-3 rounded-xl border flex items-center space-x-3 transition-all hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Mail size={16} />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-slate-400 font-mono">EMAIL</div>
              <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {personalInfo.email}
              </div>
            </div>
          </a>

          <a 
            href={`tel:${personalInfo.phone}`}
            className={`p-3 rounded-xl border flex items-center space-x-3 transition-all hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Phone size={16} />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-slate-400 font-mono">PHONE</div>
              <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {personalInfo.phone}
              </div>
            </div>
          </a>

          <div className="flex space-x-2 pt-1">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center space-x-1.5 text-xs font-bold ${
                isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-orange-300 text-slate-900'
              }`}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center space-x-1.5 text-xs font-bold ${
                isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-orange-300 text-slate-900'
              }`}
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Quick Message Form */}
        <form onSubmit={handleSubmit} className={`p-4 rounded-2xl border space-y-2.5 ${
          isDark ? 'bg-purple-950/30 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
        }`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-purple-400' : 'text-orange-600'
          }`}>
            Send Message
          </h4>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-3 py-1.5 rounded-lg text-xs border focus:outline-none ${
              isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-orange-300 text-slate-900'
            }`}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-3 py-1.5 rounded-lg text-xs border focus:outline-none ${
              isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-orange-300 text-slate-900'
            }`}
            required
          />

          <textarea
            rows="2"
            placeholder="Your Message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`w-full px-3 py-1.5 rounded-lg text-xs border focus:outline-none resize-none ${
              isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-orange-300 text-slate-900'
            }`}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center space-x-1.5 transition-all active:scale-95 ${
              isDark ? 'bg-purple-600 hover:bg-purple-500' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {sent ? <Check size={14} /> : <Send size={14} />}
            <span>{sent ? 'Message Sent!' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
