import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Code2, FolderGit2, Briefcase, FileText, Mail, 
  Sun, Moon, Volume2, VolumeX, Wifi, Battery, ChevronLeft, Terminal,
  Phone, Compass, Sliders, Music, Notebook
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

import AboutMobileCard from '../MobileCards/AboutMobileCard';
import SkillsMobileCard from '../MobileCards/SkillsMobileCard';
import ProjectsMobileCard from '../MobileCards/ProjectsMobileCard';
import ExperienceMobileCard from '../MobileCards/ExperienceMobileCard';
import ResumeMobileCard from '../MobileCards/ResumeMobileCard';
import ContactMobileCard from '../MobileCards/ContactMobileCard';

import PhoneMobileApp from '../MobileCards/PhoneMobileApp';
import SafariMobileApp from '../MobileCards/SafariMobileApp';
import SettingsMobileApp from '../MobileCards/SettingsMobileApp';
import MusicMobileApp from '../MobileCards/MusicMobileApp';
import TerminalMobileApp from '../MobileCards/TerminalMobileApp';
import NotesMobileApp from '../MobileCards/NotesMobileApp';

// Grid apps (Portfolio Section Apps & Dev Tools)
const gridAppIcons = [
  { id: 'about', label: 'About Me', icon: User, color: 'from-purple-500 to-indigo-600', lightColor: 'from-purple-600 to-indigo-700', Component: AboutMobileCard },
  { id: 'skills', label: 'Skills', icon: Code2, color: 'from-blue-500 to-cyan-600', lightColor: 'from-blue-600 to-cyan-700', Component: SkillsMobileCard },
  { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'from-emerald-500 to-teal-600', lightColor: 'from-emerald-600 to-teal-700', Component: ProjectsMobileCard },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'from-amber-500 to-orange-600', lightColor: 'from-amber-600 to-orange-700', Component: ExperienceMobileCard },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'from-rose-500 to-pink-600', lightColor: 'from-rose-600 to-pink-700', Component: ResumeMobileCard },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-violet-500 to-purple-700', lightColor: 'from-violet-600 to-purple-800', Component: ContactMobileCard },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'from-gray-700 to-slate-900', lightColor: 'from-slate-800 to-zinc-900', Component: TerminalMobileApp },
  { id: 'notes', label: 'Notes', icon: Notebook, color: 'from-amber-500 to-yellow-600', lightColor: 'from-amber-600 to-yellow-700', Component: NotesMobileApp }
];

// Bottom Dock Apps (4 Unique Native iOS Utility Apps)
const dockAppIcons = [
  { id: 'phone', label: 'Phone', icon: Phone, color: 'from-emerald-500 to-green-600', lightColor: 'from-emerald-600 to-green-700', Component: PhoneMobileApp },
  { id: 'safari', label: 'Safari', icon: Compass, color: 'from-blue-500 to-sky-600', lightColor: 'from-blue-600 to-sky-700', Component: SafariMobileApp },
  { id: 'settings', label: 'Settings', icon: Sliders, color: 'from-slate-600 to-zinc-800', lightColor: 'from-slate-700 to-zinc-800', Component: SettingsMobileApp },
  { id: 'music', label: 'Music', icon: Music, color: 'from-rose-500 to-pink-600', lightColor: 'from-rose-600 to-pink-700', Component: MusicMobileApp }
];

const allApps = [...gridAppIcons, ...dockAppIcons];

export default function MobileOSDesktop({ isDark, onToggleTheme }) {
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [activeApp, setActiveApp] = useState(null);
  const [timeStr, setTimeStr] = useState('');
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
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenApp = (appId) => {
    soundFx.playKeyClick();
    soundFx.playWindowOpen();
    setActiveApp(appId);
  };

  const handleCloseApp = () => {
    soundFx.playWindowClose();
    setActiveApp(null);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) soundFx.playKeyClick();
  };

  const ActiveComponent = activeApp ? allApps.find(a => a.id === activeApp)?.Component : null;
  const activeAppMeta = activeApp ? allApps.find(a => a.id === activeApp) : null;

  return (
    <div className={`w-full h-full relative overflow-hidden select-none font-sans flex flex-col transition-colors duration-500 ${
      isDark ? 'bg-[#0b0718] text-white' : 'bg-[#fffaf3] text-slate-900'
    }`}>
      {/* Dynamic Island & iOS Status Bar */}
      <div className={`w-full px-4 pt-3 pb-2 flex items-center justify-between z-30 shrink-0 ${
        isDark ? 'text-slate-200' : 'text-slate-900'
      }`}>
        <span className="font-mono text-xs font-bold">{timeStr || '9:41'}</span>
        
        {/* Dynamic Island Notch */}
        <div className="w-24 h-5 rounded-full bg-black flex items-center justify-between px-2.5 shadow-md">
          <div className="w-2 h-2 rounded-full bg-blue-900 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={toggleSound} className="opacity-80 hover:opacity-100">
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
          <button 
            onClick={() => {
              soundFx.playThemeSwitch();
              onToggleTheme();
            }} 
            className="opacity-80 hover:opacity-100"
          >
            {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} className="text-purple-600" />}
          </button>
          <Wifi size={12} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
          <Battery size={13} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!booted ? (
          /* IPHONE BOOT LOADER */
          <motion.div
            key="mobile-boot"
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl mb-4 ${
              isDark ? 'bg-gradient-to-tr from-purple-600 to-indigo-500' : 'bg-gradient-to-tr from-orange-500 to-amber-500'
            }`}>
              <Terminal size={26} className="text-white animate-pulse" />
            </div>
            <h1 className="text-lg font-extrabold font-heading mb-1">
              Sonu<span className={isDark ? "text-purple-400" : "text-orange-600"}>OS</span> v4.3
            </h1>
            <p className={`text-[11px] font-mono mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Loading....
            </p>
            <div className={`w-36 h-1.5 rounded-full overflow-hidden border p-0.5 ${
              isDark ? 'bg-purple-950 border-purple-500/30' : 'bg-orange-100 border-orange-300'
            }`}>
              <div 
                className={`h-full rounded-full ${
                  isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                }`}
                style={{ width: `${bootProgress}%` }}
              />
            </div>
          </motion.div>
        ) : activeApp && ActiveComponent ? (
          /* INSIDE APP FULLSCREEN VIEW ON IPHONE */
          <motion.div
            key="app-view"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="flex-1 flex flex-col overflow-hidden relative z-20"
          >
            {/* App Top Navigation Bar */}
            <div className={`px-3 py-2 border-b flex items-center justify-between shrink-0 ${
              isDark ? 'bg-slate-900/90 border-purple-500/20' : 'bg-white/90 border-orange-200 shadow-xs'
            }`}>
              <button
                onClick={handleCloseApp}
                className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
                  isDark ? 'text-purple-400 hover:bg-purple-500/20' : 'text-orange-600 hover:bg-orange-100'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Home</span>
              </button>

              <div className="flex items-center space-x-2">
                {activeAppMeta && (
                  <div className={`w-5 h-5 rounded-md bg-gradient-to-tr ${
                    isDark ? activeAppMeta.color : activeAppMeta.lightColor
                  } flex items-center justify-center text-white shrink-0`}>
                    <activeAppMeta.icon size={12} />
                  </div>
                )}
                <span className={`text-xs font-extrabold font-heading ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {activeAppMeta?.label}
                </span>
              </div>

              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* App Content Scrollable Container */}
            <div className="flex-1 flex flex-col overflow-y-auto p-3.5 space-y-4">
              <ActiveComponent 
                isDark={isDark} 
                onToggleTheme={onToggleTheme} 
                isMuted={isMuted} 
                onToggleSound={toggleSound} 
              />
            </div>

            {/* Bottom iOS Home Indicator Bar */}
            <div className="py-2 flex justify-center shrink-0">
              <button 
                onClick={handleCloseApp} 
                className={`w-28 h-1 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} 
              />
            </div>
          </motion.div>
        ) : (
          /* IPHONE HOME SCREEN WITH APP GRID */
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-between p-4 relative z-10"
          >
            {/* Header Profile Title */}
            <div className="text-center pt-2 space-y-1">
              <h2 className={`text-xl font-extrabold font-heading tracking-tight ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Sonu Kumar Kapar
              </h2>
              <p className={`text-[11px] font-semibold ${
                isDark ? 'text-purple-400' : 'text-orange-600'
              }`}>
                Senior Full Stack & AI Developer
              </p>
            </div>

            {/* App Grid (4 cols / 2 rows = 8 apps) */}
            <div className="grid grid-cols-4 gap-3 my-auto px-1">
              {gridAppIcons.map((app) => {
                const Icon = app.icon;
                return (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleOpenApp(app.id)}
                    className="flex flex-col items-center group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${
                      isDark ? app.color : (app.lightColor || app.color)
                    } flex items-center justify-center text-white shadow-xl mb-1`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-bold tracking-wide truncate max-w-[60px] ${
                      isDark ? 'text-slate-200' : 'text-slate-900'
                    }`}>
                      {app.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom iOS Dock (4 Unique Native Apps: Phone, Safari, Settings, Music) */}
            <div className={`p-2.5 rounded-3xl backdrop-blur-xl border flex justify-around items-center ${
              isDark 
                ? 'bg-slate-900/70 border-white/10 shadow-2xl' 
                : 'bg-white/90 border-orange-200 shadow-xl'
            }`}>
              {dockAppIcons.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleOpenApp(app.id)}
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${
                      isDark ? app.color : app.lightColor
                    } flex items-center justify-center text-white shadow-md active:scale-90 transition-transform`}
                    title={app.label}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
