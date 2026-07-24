import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Code2, FolderGit2, Briefcase, FileText, Mail, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

import AboutCard from './AboutCard';
import SkillsCard from './SkillsCard';
import ProjectsCard from './ProjectsCard';
import ExperienceCard from './ExperienceCard';
import ResumeCard from './ResumeCard';
import ContactCard from './ContactCard';

const cardComponents = {
  about: { title: "About Sonu", icon: User, Component: AboutCard },
  skills: { title: "Technical Stack", icon: Code2, Component: SkillsCard },
  projects: { title: "Featured Projects", icon: FolderGit2, Component: ProjectsCard },
  experience: { title: "Work Experience", icon: Briefcase, Component: ExperienceCard },
  resume: { title: "Resume (Sonu-CV.pdf)", icon: FileText, Component: ResumeCard },
  contact: { title: "Get In Touch", icon: Mail, Component: ContactCard }
};

// Preset positions surrounding the central laptop model (avoiding bottom keyboard)
const dockingPositions = [
  // Slot 0: Right floating dock
  "right-4 sm:right-8 md:right-12 lg:right-16 top-12 sm:top-16 lg:top-20",
  // Slot 1: Left floating dock
  "left-4 sm:left-8 md:left-12 lg:left-16 top-12 sm:top-16 lg:top-20",
  // Slot 2: Top center floating dock
  "top-4 left-1/2 -translate-x-1/2"
];

export default function FloatingCardsManager({ openApps, onCloseApp, isDark }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {openApps.map((appId, index) => {
          const config = cardComponents[appId];
          if (!config) return null;

          const { title, icon: Icon, Component } = config;

          // Compute docking slot (loops through available top/left/right positions)
          const posClass = dockingPositions[index % dockingPositions.length];

          const handleClose = () => {
            soundFx.playWindowClose();
            onCloseApp(appId);
          };

          return (
            <motion.div
              key={appId}
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute pointer-events-auto w-[92vw] sm:w-[420px] md:w-[460px] max-h-[85vh] flex flex-col rounded-2xl ${
                isDark ? 'glass-purple' : 'glass-orange'
              } ${posClass} transition-colors duration-500 z-40`}
            >
              {/* Card Header Bar */}
              <div className="flex items-center justify-between p-3.5 border-b border-purple-500/20 dark:border-purple-500/20 light:border-orange-500/20 cursor-move select-none">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl ${
                    isDark 
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                      : 'bg-orange-500/20 text-orange-600 border border-orange-400/30'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-heading">
                      {title}
                    </h3>
                    <span className="text-[10px] font-mono text-purple-400 dark:text-purple-400 light:text-orange-600 uppercase tracking-widest">
                      PORTFOLIO CARD
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-rose-500/20 hover:border hover:border-rose-500/40 transition-all"
                    title="Close Window"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(85vh-70px)]">
                <Component isDark={isDark} />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
