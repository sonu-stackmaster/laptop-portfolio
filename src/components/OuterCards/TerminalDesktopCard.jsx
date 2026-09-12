import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function TerminalDesktopCard({ isDark }) {
  const { personalInfo } = portfolioData;
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SonuOS macOS zsh Terminal v4.3. Type "help" for available commands.' }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'cmd', text: `sonu@macbook:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available commands:\n• whoami   - Developer profile summary\n• skills   - Technical stack overview\n• projects - Highlighted projects\n• contact  - Email & phone info\n• play     - Launch Cyber Snake mini-game\n• coffee   - Brew a fresh cup of coffee\n• matrix   - Enter the matrix\n• hire     - Fast-track recruiter contact\n• clear    - Clear console'
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}\nLocation: ${personalInfo.location}\nWorkspace: MacBook Pro M3 Max | 4+ Yrs Exp | 20+ Systems Delivered`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: '⚡ Languages: JavaScript, TypeScript, Python, SQL, C++\n🚀 Frontend: React, Next.js, Three.js, WebGL, TailwindCSS\n🛠️ Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, Docker, AWS'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: '1. AI Multi-Agent Engine (RAG & Autonomous Agents)\n2. Enterprise Cloud Orchestrator (Microservices)\n3. High-Frequency Realtime Gateway (WebGL & WebSockets)'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nGitHub: ${personalInfo.github}`
        });
        break;
      case 'coffee':
        newHistory.push({
          type: 'output',
          text: '☕ *Brewing fresh hot caramel macchiato...* \n✨ Energy level: 100% | Bugs resolved: 42'
        });
        break;
      case 'matrix':
        newHistory.push({
          type: 'output',
          text: '🟢 Wake up, Neo... The Matrix has you. Follow the white rabbit.'
        });
        break;
      case 'hire':
      case 'sudo hire':
        newHistory.push({
          type: 'output',
          text: `🎉 Access Granted! Let's build extraordinary software together.\n📧 Email me directly at ${personalInfo.email}`
        });
        break;
      case 'play':
      case 'game':
      case 'snake':
        newHistory.push({
          type: 'output',
          text: '🕹️ Tip: Open the "Arcade" app from Dock or Spotlight (⌘K) to play 60 FPS Cyber Snake!'
        });
        break;
      case 'clear':
        setHistory([{ type: 'sys', text: 'Console cleared. Type "help" for commands.' }]);
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
    <div 
      onPointerDown={(e) => e.stopPropagation()}
      className={`p-3 rounded-xl border flex flex-col min-h-[280px] max-h-[340px] font-mono text-left select-text ${
        isDark ? 'bg-[#06030e] border-purple-500/30 text-purple-300' : 'bg-slate-900 border-orange-300 text-emerald-400'
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center space-x-2 pb-2 border-b border-purple-500/20 text-xs shrink-0 select-none">
        <TermIcon size={14} className="text-purple-400" />
        <span className="font-bold">sonu@macbook -- zsh</span>
      </div>

      {/* Output Console Container */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1.5 text-xs leading-relaxed">
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Prompt */}
      <form 
        onSubmit={handleCommand} 
        onPointerDown={(e) => e.stopPropagation()}
        className="pt-2 border-t border-purple-500/20 flex items-center space-x-1 shrink-0"
      >
        <span className="text-purple-400 font-bold text-xs">sonu@macbook:~$</span>
        <input
          ref={inputRef}
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
