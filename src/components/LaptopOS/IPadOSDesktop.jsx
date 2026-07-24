import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Code2, FolderGit2, Briefcase, FileText, Mail, 
  Sun, Moon, Volume2, VolumeX, Wifi, Battery, Terminal, 
  Compass, Sliders, Music, Notebook, ArrowLeft, X, Sparkles, Clock
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

import AboutiPadCard from '../iPadCards/AboutiPadCard';
import SkillsiPadCard from '../iPadCards/SkillsiPadCard';
import ProjectsiPadCard from '../iPadCards/ProjectsiPadCard';
import ExperienceiPadCard from '../iPadCards/ExperienceiPadCard';
import ResumeiPadCard from '../iPadCards/ResumeiPadCard';
import ContactiPadCard from '../iPadCards/ContactiPadCard';
import TerminaliPadCard from '../iPadCards/TerminaliPadCard';
import SafariiPadCard from '../iPadCards/SafariiPadCard';
import SettingsiPadCard from '../iPadCards/SettingsiPadCard';
import MusiciPadCard from '../iPadCards/MusiciPadCard';
import NotesiPadCard from '../iPadCards/NotesiPadCard';

const appRegistry = {
  about: { title: "About Me", subtitle: "DEVELOPER OVERVIEW", icon: User, color: "from-purple-500 to-indigo-600", Component: AboutiPadCard },
  skills: { title: "Technical Stack", subtitle: "SKILLS & TECHNOLOGIES", icon: Code2, color: "from-blue-500 to-cyan-600", Component: SkillsiPadCard },
  projects: { title: "Featured Projects", subtitle: "SELECTED WORK", icon: FolderGit2, color: "from-emerald-500 to-teal-600", Component: ProjectsiPadCard },
  experience: { title: "Work Experience", subtitle: "CAREER TIMELINE", icon: Briefcase, color: "from-amber-500 to-orange-600", Component: ExperienceiPadCard },
  resume: { title: "Resume", subtitle: "VERIFIED RESUME", icon: FileText, color: "from-rose-500 to-pink-600", Component: ResumeiPadCard },
  contact: { title: "Get In Touch", subtitle: "CONNECT & INQUIRE", icon: Mail, color: "from-violet-500 to-purple-700", Component: ContactiPadCard },
  terminal: { title: "Terminal CLI", subtitle: "INTERACTIVE CONSOLE", icon: Terminal, color: "from-gray-700 to-slate-900", Component: TerminaliPadCard },
  safari: { title: "Safari Browser", subtitle: "WEB BOOKMARKS", icon: Compass, color: "from-blue-500 to-sky-600", Component: SafariiPadCard },
  settings: { title: "Settings", subtitle: "TABLET PREFERENCES", icon: Sliders, color: "from-slate-600 to-zinc-800", Component: SettingsiPadCard },
  music: { title: "Apple Music", subtitle: "LOFI BEATS", icon: Music, color: "from-rose-500 to-pink-600", Component: MusiciPadCard },
  notes: { title: "Notes", subtitle: "TABLET STICKY NOTES", icon: Notebook, color: "from-amber-500 to-yellow-600", Component: NotesiPadCard }
};

const homeGridApps = [
  { id: 'about', label: 'About Me', icon: User, color: 'from-purple-500 to-indigo-600' },
  { id: 'skills', label: 'Skills', icon: Code2, color: 'from-blue-500 to-cyan-600' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'from-emerald-500 to-teal-600' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'from-amber-500 to-orange-600' },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'from-rose-500 to-pink-600' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-violet-500 to-purple-700' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'from-gray-700 to-slate-900' },
  { id: 'notes', label: 'Notes', icon: Notebook, color: 'from-amber-500 to-yellow-600' }
];

const dockApps = [
  { id: 'safari', label: 'Safari', icon: Compass, color: 'from-blue-500 to-sky-600' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'from-gray-700 to-slate-900' },
  { id: 'settings', label: 'Settings', icon: Sliders, color: 'from-slate-600 to-zinc-800' },
  { id: 'music', label: 'Music', icon: Music, color: 'from-rose-500 to-pink-600' },
  { id: 'notes', label: 'Notes', icon: Notebook, color: 'from-amber-500 to-yellow-600' }
];

export default function IPadOSDesktop({ isDark, onToggleTheme, openApps = [], onOpenApp, onCloseApp }) {
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [activeApp, setActiveApp] = useState(null);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Boot sequence
  useEffect(() => {
    soundFx.playBootSound();
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 350);
          return 100;
        }
        return prev + 12;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLaunchApp = (appId) => {
    soundFx.playKeyClick();
    soundFx.playWindowOpen();
    setActiveApp(appId);
    if (onOpenApp) onOpenApp(appId);
  };

  const handleCloseApp = () => {
    soundFx.playWindowClose();
    if (activeApp && onCloseApp) onCloseApp(activeApp);
    setActiveApp(null);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) soundFx.playKeyClick();
  };

  const activeConfig = activeApp ? appRegistry[activeApp] : null;
  const ActiveComponent = activeConfig ? activeConfig.Component : null;

  return (
    <div className={`w-full h-full relative overflow-hidden select-none font-sans transition-colors duration-500 flex flex-col justify-between ${
      isDark ? 'glass-screen-purple text-white' : 'glass-screen-orange text-slate-900'
    }`}>
      <AnimatePresence>
        {!booted ? (
          /* iPadOS Boot Loader Screen */
          <motion.div
            key="boot-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center ${
              isDark ? 'bg-[#06030c] text-white' : 'bg-[#fffaf3] text-slate-900'
            }`}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-6 ${
                isDark 
                  ? 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 neon-glow-purple' 
                  : 'bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 neon-glow-orange'
              }`}
            >
              <Terminal size={32} className="text-white animate-pulse" />
            </motion.div>

            <h1 className="text-xl font-bold font-heading tracking-wide mb-1">
              SonuOS <span className={isDark ? "text-purple-400" : "text-orange-600"}>iPadOS</span> v4.3
            </h1>
            <p className={`text-xs mb-5 font-mono ${isDark ? 'text-purple-300/80' : 'text-slate-600'}`}>
              Starting iPad Pro Stage Manager...
            </p>

            <div className={`w-44 h-2 rounded-full overflow-hidden border p-0.5 ${
              isDark ? 'bg-purple-950/80 border-purple-500/30' : 'bg-orange-100 border-orange-300'
            }`}>
              <motion.div
                className={`h-full rounded-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500' 
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500'
                }`}
                style={{ width: `${bootProgress}%` }}
              />
            </div>
          </motion.div>
        ) : (
          /* iPadOS Desktop Content */
          <motion.div
            key="ipad-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col justify-between p-3 relative z-10"
          >
            {/* Top iPad Status Bar */}
            <div className={`w-full py-1.5 px-3 rounded-xl backdrop-blur-md border flex items-center justify-between text-xs ${
              isDark ? 'bg-slate-900/80 border-purple-500/30 text-slate-200 shadow-md' : 'bg-white/90 border-orange-300/60 text-slate-800 shadow-xs'
            }`}>
              <div className="flex items-center space-x-2">
                <span className="font-bold font-mono text-[11px]">{timeStr}</span>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{dateStr}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <button onClick={toggleSound} title={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={13} className="text-rose-500" /> : <Volume2 size={13} />}
                </button>
                <button onClick={() => { soundFx.playThemeSwitch(); onToggleTheme(); }} title="Toggle Theme">
                  {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} className="text-purple-600" />}
                </button>
                <Wifi size={13} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
                <Battery size={14} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
              </div>
            </div>

            {/* Active App Fullscreen Stage or Desktop Home Grid */}
            <div className="flex-1 my-auto flex flex-col justify-center items-center overflow-hidden py-2 relative">
              <AnimatePresence mode="wait">
                {activeApp && ActiveComponent ? (
                  <motion.div
                    key={activeApp}
                    initial={{ scale: 0.9, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 15 }}
                    className={`w-full h-full flex flex-col rounded-2xl border overflow-hidden ${
                      isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-white/95 border-orange-200 text-slate-900 shadow-lg'
                    }`}
                  >
                    {/* App Bar */}
                    <div className={`px-3 py-2 border-b flex items-center justify-between shrink-0 ${
                      isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200'
                    }`}>
                      <button
                        onClick={handleCloseApp}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold ${
                          isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        <ArrowLeft size={14} />
                        <span>Home</span>
                      </button>
                      <span className="text-xs font-extrabold font-heading">{activeConfig.title}</span>
                      <button onClick={handleCloseApp} className="p-1 text-slate-400 hover:text-rose-500">
                        <X size={16} />
                      </button>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 p-3 overflow-y-auto">
                      <ActiveComponent isDark={isDark} onToggleTheme={onToggleTheme} isMuted={isMuted} onToggleSound={toggleSound} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full flex flex-col items-center justify-center space-y-4"
                  >
                    {/* iPad Widgets Header Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full px-2">
                      <div className={`p-3 rounded-2xl border flex items-center space-x-3 ${
                        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-white/90 border-orange-200 shadow-xs'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                          <Sparkles size={20} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <div className={`text-xs font-extrabold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            Sonu Kumar Kapar
                          </div>
                          <div className={`text-[10px] font-mono font-semibold truncate ${isDark ? 'text-purple-400' : 'text-orange-600'}`}>
                            4+ Yrs Exp • 20+ Systems
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-2xl border flex items-center space-x-3 ${
                        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-white/90 border-orange-200 shadow-xs'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                          <Clock size={20} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <div className={`text-xs font-extrabold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            iPadOS Stage v4.3
                          </div>
                          <div className={`text-[10px] font-mono font-semibold truncate ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            ● Stage Manager Active
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-3.5 max-w-md w-full px-2">
                      {homeGridApps.map((app) => {
                        const Icon = app.icon;
                        return (
                          <motion.button
                            key={app.id}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLaunchApp(app.id)}
                            className="flex flex-col items-center group p-1.5"
                          >
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-md mb-1 transition-transform group-hover:scale-105`}>
                              <Icon size={22} />
                            </div>
                            <span className={`text-[11px] font-bold tracking-tight ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                              {app.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom iPad Floating Dock */}
            <div className={`py-1.5 px-4 rounded-2xl backdrop-blur-xl border flex items-center justify-around max-w-xs w-full mx-auto transition-all shadow-xl ${
              isDark ? 'bg-slate-900/80 border-white/15 shadow-purple-950/40' : 'bg-white/90 border-orange-200/90 shadow-orange-500/20'
            }`}>
              {dockApps.map((app) => {
                const Icon = app.icon;
                return (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLaunchApp(app.id)}
                    className="p-1"
                    title={app.label}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon size={18} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
