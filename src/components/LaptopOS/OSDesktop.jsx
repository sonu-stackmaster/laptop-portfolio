import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Code2, FolderGit2, Briefcase, FileText, Mail, 
  Sun, Moon, Volume2, VolumeX, Wifi, Battery, Terminal
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const appIcons = [
  { id: 'about', label: 'About Me', icon: User, color: 'from-purple-500 to-indigo-600', badge: 'PRO' },
  { id: 'skills', label: 'Skills', icon: Code2, color: 'from-blue-500 to-cyan-600', badge: '4+ YRS' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'from-emerald-500 to-teal-600', badge: '20+' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'from-amber-500 to-orange-600', badge: 'SR' },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'from-rose-500 to-pink-600', badge: 'PDF' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-violet-500 to-purple-700', badge: 'HIRE' }
];

export default function OSDesktop({ isDark, onToggleTheme, openApps, onOpenApp }) {
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Boot sequence animation on land
  useEffect(() => {
    soundFx.playBootSound();
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 400);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appId) => {
    soundFx.playKeyClick();
    soundFx.playWindowOpen();
    onOpenApp(appId);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) soundFx.playKeyClick();
  };

  return (
    <div className={`w-full h-full relative overflow-hidden select-none font-sans ${
      isDark ? 'glass-screen-purple text-white' : 'glass-screen-orange text-slate-900'
    }`}>
      {/* Scanline texture for authentic monitor feel */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-25 z-20" />

      <AnimatePresence>
        {!booted ? (
          /* OS BOOT LOADER SCREEN */
          <motion.div
            key="boot-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 bg-[#06030c] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-2xl neon-glow-purple mb-6"
            >
              <Terminal size={32} className="text-white animate-pulse" />
            </motion.div>

            <h1 className="text-xl font-bold font-heading text-white tracking-wide mb-1">
              SONU<span className="text-purple-400">OS</span> v4.2
            </h1>
            <p className="text-xs text-purple-300/80 mb-6 font-mono">
              Senior Developer Portfolio Loading...
            </p>

            {/* Progress Bar */}
            <div className="w-48 h-2 rounded-full bg-purple-950/80 overflow-hidden border border-purple-500/30 p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-2">
              {bootProgress}% Loaded
            </div>
          </motion.div>
        ) : (
          /* MAIN OPERATING SYSTEM DESKTOP */
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col justify-between p-3 relative z-10"
          >
            {/* Top OS Status Bar */}
            <div className="w-full py-1.5 px-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/80 backdrop-blur-md border border-purple-500/20 dark:border-purple-500/20 light:border-orange-400/30 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                {/* Modern Developer Emblem Graphic SVG */}
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-sm shrink-0">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <span className="font-bold font-heading tracking-wide text-xs text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Sonu-Kapar
                </span>
                <span className="text-slate-500/80 font-mono text-[11px]">|</span>
                <span className="text-[11px] font-semibold text-purple-400 dark:text-purple-400 light:text-orange-600">
                  Full Stack Developer
                </span>
              </div>

              {/* Status Controls */}
              <div className="flex items-center space-x-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <button
                  onClick={toggleSound}
                  className="hover:text-purple-400 dark:hover:text-purple-400 light:hover:text-orange-600 transition-colors"
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button
                  onClick={() => {
                    soundFx.playThemeSwitch();
                    onToggleTheme();
                  }}
                  className="hover:text-purple-400 dark:hover:text-purple-400 light:hover:text-orange-600 transition-colors"
                  title="Toggle Purple/Black & Pale Orange Themes"
                >
                  {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-purple-600" />}
                </button>
                <div className="flex items-center gap-1">
                  <Wifi size={13} className="text-emerald-400" />
                  <Battery size={14} className="text-emerald-400" />
                </div>
                <span className="font-mono text-[11px] font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  {timeStr}
                </span>
              </div>
            </div>

            {/* Desktop Screen Main Content Area */}
            <div className="flex-1 my-auto flex flex-col justify-center items-center text-center px-4">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-md space-y-2 mb-6"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
                  Sonu Kumar Kapar
                </h2>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-medium">
                  Senior Full Stack & AI Developer | 4+ Yrs Exp | 20+ Systems Delivered
                </p>
              </motion.div>

              {/* Grid of App Icons inside the Laptop Screen */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-lg w-full">
                {appIcons.map((app) => {
                  const Icon = app.icon;
                  const isOpen = openApps.includes(app.id);

                  return (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppClick(app.id)}
                      className={`group relative flex flex-col items-center p-2.5 rounded-2xl transition-all ${
                        isOpen
                          ? 'bg-purple-600/30 border border-purple-400 shadow-lg'
                          : 'bg-slate-900/40 hover:bg-slate-800/60 border border-white/10'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-lg mb-1.5 group-hover:shadow-purple-500/50 transition-shadow`}>
                        <Icon size={22} />
                      </div>

                      <span className="text-[11px] font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 tracking-wide">
                        {app.label}
                      </span>

                      {/* Small Status Indicator Badge */}
                      {isOpen && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-400 light:bg-orange-500 mt-1 animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
