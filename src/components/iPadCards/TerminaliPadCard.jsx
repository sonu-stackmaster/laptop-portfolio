import React, { useState } from 'react';
import { Terminal as TermIcon, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function TerminaliPadCard({ isDark }) {
  const { personalInfo } = portfolioData;
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SonuOS iPadOS Terminal v4.3. Type "help" for available commands.' }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'cmd', text: `sonu@ipad:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'iPadOS Commands:\n• whoami - iPad User Details\n• skills - Technical Stack\n• projects - Highlighted Work\n• contact - Reach Sonu\n• clear - Clear Screen'
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}\nDevice: iPad Pro 12.9" (SonuOS v4.3)\nLocation: ${personalInfo.location}`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Tech: React, Node.js, TypeScript, Python, AWS, Docker, AI Agents, PostgreSQL'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: '1. AI Multi-Agent Engine\n2. Enterprise Cloud Gateway\n3. Realtime Messaging Pipeline'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}`
        });
        break;
      case 'clear':
        setHistory([{ type: 'sys', text: 'Terminal cleared. Type "help" for commands.' }]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: "${cmd}". Type "help" for valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className={`p-3 rounded-xl border flex flex-col h-[320px] font-mono text-left ${
      isDark ? 'bg-[#05030b] border-purple-500/30 text-purple-300' : 'bg-slate-900 border-orange-300 text-emerald-400'
    }`}>
      <div className="flex items-center space-x-2 pb-2 border-b border-purple-500/20 text-xs shrink-0">
        <TermIcon size={14} className="text-purple-400" />
        <span className="font-bold">sonu@ipad -- zsh</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-1.5 text-xs leading-relaxed select-text">
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

      <form onSubmit={handleCommand} className="pt-2 border-t border-purple-500/20 flex items-center space-x-1 shrink-0">
        <span className="text-purple-400 font-bold text-xs">sonu@ipad:~$</span>
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
