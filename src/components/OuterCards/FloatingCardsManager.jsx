import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Code2, FolderGit2, Briefcase, FileText, Mail, Terminal, Compass, Sliders, Music, Notebook } from 'lucide-react';
import { soundFx } from '../../utils/audio';

import AboutCard from './AboutCard';
import SkillsCard from './SkillsCard';
import ProjectsCard from './ProjectsCard';
import ExperienceCard from './ExperienceCard';
import ResumeCard from './ResumeCard';
import ContactCard from './ContactCard';

import TerminalDesktopCard from './TerminalDesktopCard';
import SafariDesktopCard from './SafariDesktopCard';
import SettingsDesktopCard from './SettingsDesktopCard';
import MusicDesktopCard from './MusicDesktopCard';
import NotesDesktopCard from './NotesDesktopCard';

const cardComponents = {
  about: { title: "About Me", subtitle: "DEVELOPER OVERVIEW", icon: User, Component: AboutCard },
  skills: { title: "Technical Stack", subtitle: "SKILLS & TECHNOLOGIES", icon: Code2, Component: SkillsCard },
  projects: { title: "Featured Projects", subtitle: "SELECTED WORK", icon: FolderGit2, Component: ProjectsCard },
  experience: { title: "Work Experience", subtitle: "CAREER TIMELINE", icon: Briefcase, Component: ExperienceCard },
  resume: { title: "Resume", subtitle: "VERIFIED RESUME", icon: FileText, Component: ResumeCard },
  contact: { title: "Get In Touch", subtitle: "CONNECT & INQUIRE", icon: Mail, Component: ContactCard },
  terminal: { title: "Terminal CLI", subtitle: "INTERACTIVE CONSOLE", icon: Terminal, Component: TerminalDesktopCard },
  safari: { title: "Safari Browser", subtitle: "WEB BOOKMARKS", icon: Compass, Component: SafariDesktopCard },
  settings: { title: "System Preferences", subtitle: "DESKTOP SETTINGS", icon: Sliders, Component: SettingsDesktopCard },
  music: { title: "Apple Music", subtitle: "DEV FOCUS LOFI", icon: Music, Component: MusicDesktopCard },
  notes: { title: "Developer Notes", subtitle: "STICKY NOTES", icon: Notebook, Component: NotesDesktopCard }
};

// Fixed initial docking positions tied to each specific app ID
const fixedCardPositions = {
  about: "left-4 sm:left-8 md:left-12 lg:left-16 top-10 sm:top-14",
  skills: "right-4 sm:right-8 md:right-12 lg:right-16 top-10 sm:top-14",
  projects: "left-4 sm:left-10 lg:left-20 top-24 sm:top-28",
  experience: "top-6 left-1/2 -translate-x-1/2",
  resume: "right-4 sm:right-10 lg:right-20 top-24 sm:top-28",
  contact: "top-12 left-1/2 -translate-x-1/2",
  terminal: "top-12 left-1/2 -translate-x-1/2",
  safari: "top-10 left-10",
  settings: "top-14 right-10",
  music: "top-16 left-1/2 -translate-x-1/2",
  notes: "top-12 right-16"
};

export default function FloatingCardsManager({ openApps, onCloseApp, isDark, onToggleTheme }) {
  const containerRef = useRef(null);
  const [cardZIndexes, setCardZIndexes] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const highestZIndex = useRef(50);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) soundFx.playKeyClick();
  };

  const bringToFront = (appId) => {
    highestZIndex.current += 1;
    setCardZIndexes((prev) => ({
      ...prev,
      [appId]: highestZIndex.current
    }));
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {openApps.map((appId, index) => {
          const config = cardComponents[appId];
          if (!config) return null;

          const { title, subtitle, icon: Icon, Component } = config;

          // Get fixed position for this specific card
          const posClass = fixedCardPositions[appId] || "top-10 left-1/2 -translate-x-1/2";
          const currentZ = cardZIndexes[appId] || (40 + index);

          const handleClose = () => {
            soundFx.playWindowClose();
            onCloseApp(appId);
          };

          return (
            <motion.div
              key={appId}
              drag
              dragConstraints={containerRef}
              dragElastic={0.08}
              dragMomentum={false}
              onPointerDown={() => bringToFront(appId)}
              onDragStart={() => bringToFront(appId)}
              style={{ zIndex: currentZ }}
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute pointer-events-auto w-[90vw] sm:w-[360px] md:w-[380px] lg:w-[400px] max-h-[78vh] flex flex-col rounded-2xl ${
                isDark ? 'glass-purple shadow-2xl shadow-purple-950/60' : 'glass-orange shadow-2xl shadow-orange-500/15'
              } ${posClass} transition-colors duration-500 touch-none`}
            >
              {/* Card Header Bar */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 cursor-grab active:cursor-grabbing select-none border-b ${
                isDark ? 'border-purple-500/20' : 'border-orange-200'
              }`}>
                <div className="flex items-center space-x-2.5">
                  <div className={`p-1.5 rounded-xl ${
                    isDark 
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                      : 'bg-orange-500/20 text-orange-600 border border-orange-400/40'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className={`text-xs font-extrabold font-heading ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {title}
                    </h3>
                    <span className={`text-[9px] font-mono uppercase tracking-widest ${
                      isDark ? 'text-purple-400' : 'text-orange-600 font-bold'
                    }`}>
                      {subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClose}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isDark 
                        ? 'text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border hover:border-rose-500/40' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-rose-100 hover:border hover:border-rose-300'
                    }`}
                    title="Close Window"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-3.5 sm:p-4 overflow-y-auto max-h-[calc(78vh-55px)]">
                <Component
                  isDark={isDark}
                  onToggleTheme={onToggleTheme}
                  isMuted={isMuted}
                  onToggleSound={handleToggleSound}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
