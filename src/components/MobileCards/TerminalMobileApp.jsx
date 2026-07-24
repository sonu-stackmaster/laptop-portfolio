import React, { useState } from 'react';
import { Terminal as TermIcon, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function TerminalMobileApp({ isDark }) {
  const { personalInfo } = portfolioData;
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SonuOS Mobile CLI v4.3. Type "help" for commands.' }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'cmd', text: `sonu@iphone:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available commands:\n• whoami - Developer profile summary\n• skills - Technical stack overview\n• projects - Highlighted projects\n• contact - Email & phone info\n• clear - Clear console'
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}\nLocation: ${personalInfo.location}\nExperience: 4+ Yrs | 20+ Systems Delivered`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Core Tech: React, Node.js, TypeScript, Python, AWS, Docker, PostgreSQL, LLMs, Redis'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: '1. AI Multi-Agent Engine\n2. Enterprise Cloud Orchestrator\n3. High-Frequency Realtime Gateway'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nGitHub: ${personalInfo.github}`
        });
        break;
      case 'clear':
        setHistory([{ type: 'sys', text: 'Console cleared. Type "help" for commands.' }]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className={`p-3 rounded-2xl border flex flex-col h-full flex-1 min-h-[480px] font-mono text-left ${
      isDark ? 'bg-[#06030e] border-purple-500/30 text-purple-300' : 'bg-slate-900 border-orange-300 text-emerald-400'
    }`}>
      {/* Header Bar */}
      <div className="flex items-center space-x-1.5 pb-2 border-b border-purple-500/20 text-xs shrink-0">
        <TermIcon size={14} className="text-purple-400" />
        <span className="font-bold">sonu-cli -- bash</span>
      </div>

      {/* Output Console Container */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1.5 text-[11px] leading-relaxed select-text">
        {history.map((item, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {item.type === 'cmd' ? (
              <span className="text-amber-400 font-bold">{item.text}</span>
            ) : item.type === 'error' ? (
              <span className="text-rose-400 font-semibold">{item.text}</span>
            ) : item.type === 'sys' ? (
              <span className="text-purple-400 font-bold">{item.text}</span>
            ) : (
              <span className={isDark ? "text-slate-200" : "text-emerald-300"}>{item.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleCommand} className="pt-2 border-t border-purple-500/20 flex items-center space-x-1 shrink-0">
        <span className="text-purple-400 font-bold text-xs">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type help..."
          className="flex-1 bg-transparent text-xs text-white border-none focus:outline-none font-mono"
        />
        <button type="submit" className="p-1 text-purple-400 hover:text-white">
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}
