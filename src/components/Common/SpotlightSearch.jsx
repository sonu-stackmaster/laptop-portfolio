import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, Code2, FolderGit2, Briefcase, FileText, Mail, 
  Terminal, Compass, Sliders, Music, Notebook, Moon, Sun, 
  Volume2, VolumeX, Sparkles, Download, ArrowRight, CornerDownLeft, X,
  Coffee, Pin, Gamepad2, CloudRain, Flame, Wind
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { soundscapes } from '../../utils/soundscapes';

const ALL_SEARCH_ITEMS = [
  // Apps
  { id: 'app-about', type: 'App', title: 'About Sonu', subtitle: 'Overview, background & bio', icon: User, action: (ctx) => ctx.openApp('about') },
  { id: 'app-skills', type: 'App', title: 'Technical Stack', subtitle: 'React, Node, Python, Three.js, AI', icon: Code2, action: (ctx) => ctx.openApp('skills') },
  { id: 'app-projects', type: 'App', title: 'Featured Projects', subtitle: 'Production systems & AI tools', icon: FolderGit2, action: (ctx) => ctx.openApp('projects') },
  { id: 'app-experience', type: 'App', title: 'Work Experience', subtitle: '4+ Years Career Timeline', icon: Briefcase, action: (ctx) => ctx.openApp('experience') },
  { id: 'app-resume', type: 'App', title: 'Verified Resume', subtitle: 'Experience, education & download', icon: FileText, action: (ctx) => ctx.openApp('resume') },
  { id: 'app-soundscapes', type: 'App', title: 'Ambient Soundscapes', subtitle: 'Procedural Rain, Fire & Lofi mixer', icon: CloudRain, action: (ctx) => ctx.openApp('soundscapes') },
  { id: 'app-focus', type: 'App', title: 'Focus Flow & Coffee', subtitle: 'Pomodoro timer & steaming latte', icon: Coffee, action: (ctx) => ctx.openApp('focus') },
  { id: 'app-stickies', type: 'App', title: 'Sticky Notes', subtitle: 'Pastel draggable notes & ideas', icon: Pin, action: (ctx) => ctx.openApp('stickies') },
  { id: 'app-arcade', type: 'App', title: 'Retro Cyber Arcade', subtitle: '60 FPS Cyber Snake game', icon: Gamepad2, action: (ctx) => ctx.openApp('arcade') },
  { id: 'app-terminal', type: 'App', title: 'Terminal CLI', subtitle: 'Interactive developer console', icon: Terminal, action: (ctx) => ctx.openApp('terminal') },
  { id: 'app-safari', type: 'App', title: 'Safari Browser', subtitle: 'Case studies & bookmarks', icon: Compass, action: (ctx) => ctx.openApp('safari') },
  { id: 'app-settings', type: 'App', title: 'System Preferences', subtitle: 'Wallpapers, themes & specs', icon: Sliders, action: (ctx) => ctx.openApp('settings') },
  { id: 'app-music', type: 'App', title: 'Apple Music', subtitle: 'Focus Lofi audio player', icon: Music, action: (ctx) => ctx.openApp('music') },
  { id: 'app-notes', type: 'App', title: 'Notes App', subtitle: 'Developer scratchpad & notes', icon: Notebook, action: (ctx) => ctx.openApp('notes') },

  // Quick Actions & Soundscapes
  { id: 'act-ambient-rain', type: 'Sound', title: 'Play Ambient: Midnight Rain', subtitle: 'Soothing raindrops & Lofi piano', icon: CloudRain, action: () => soundscapes.applyPreset('midnight-rain') },
  { id: 'act-ambient-fire', type: 'Sound', title: 'Play Ambient: Cozy Fireplace', subtitle: 'Warm hearth crackle & night air', icon: Flame, action: () => soundscapes.applyPreset('cozy-fireplace') },
  { id: 'act-resume-pdf', type: 'Action', title: 'Download Resume PDF', subtitle: 'Instant verified PDF export', icon: Download, action: (ctx) => ctx.downloadResume() },
  { id: 'act-dark-mode', type: 'Action', title: 'Enable Dark Mode', subtitle: 'Switch to Deep Purple palette', icon: Moon, action: (ctx) => { if (!ctx.isDark) ctx.toggleTheme(); } },
  { id: 'act-light-mode', type: 'Action', title: 'Enable Light Mode', subtitle: 'Switch to Warm Orange palette', icon: Sun, action: (ctx) => { if (ctx.isDark) ctx.toggleTheme(); } },
  { id: 'act-wp-rain', type: 'Action', title: 'Set Wallpaper: Neon Cyber Rain', subtitle: 'Atmospheric raindrops & glass', icon: Sparkles, action: (ctx) => ctx.setWallpaper('neon-rain') },
  { id: 'act-wp-sonoma', type: 'Action', title: 'Set Wallpaper: macOS Sonoma', subtitle: 'Harmonic chromatic waves', icon: Sparkles, action: (ctx) => ctx.setWallpaper('sonoma-waves') },
  { id: 'act-wp-nebula', type: 'Action', title: 'Set Wallpaper: Cyber Nebula', subtitle: 'Cosmic glowing aurora mesh', icon: Sparkles, action: (ctx) => ctx.setWallpaper('cyber-nebula') },
  { id: 'act-wp-warp', type: 'Action', title: 'Set Wallpaper: Cosmic Warp', subtitle: '3D starfield velocity warp', icon: Sparkles, action: (ctx) => ctx.setWallpaper('starfield-warp') },
  { id: 'act-mute', type: 'Action', title: 'Toggle Audio FX', subtitle: 'Mute or unmute system audio', icon: Volume2, action: (ctx) => ctx.toggleSound() }
];

export default function SpotlightSearch({ 
  isOpen, 
  onClose, 
  onOpenApp, 
  isDark, 
  onToggleTheme, 
  onChangeWallpaper, 
  isMuted, 
  onToggleSound 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      soundFx.playSpotlightChime();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredItems = query.trim() === ''
    ? ALL_SEARCH_ITEMS.slice(0, 7)
    : ALL_SEARCH_ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        );
      });

  const handleExecute = (item) => {
    if (!item) return;
    soundFx.playKeyClick();

    const ctx = {
      openApp: (appId) => {
        onOpenApp(appId);
        onClose();
      },
      downloadResume: () => {
        onOpenApp('resume');
        onClose();
      },
      toggleTheme: () => {
        soundFx.playThemeSwitch();
        onToggleTheme();
        onClose();
      },
      setWallpaper: (wpId) => {
        if (onChangeWallpaper) onChangeWallpaper(wpId);
        onClose();
      },
      toggleSound: () => {
        if (onToggleSound) onToggleSound();
        onClose();
      },
      isDark
    };

    item.action(ctx);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      soundFx.playKeyClick();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      soundFx.playKeyClick();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleExecute(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/45 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${
            isDark ? 'glass-purple border-purple-500/30' : 'glass-orange border-orange-300 shadow-orange-500/10'
          }`}
        >
          {/* Top Search Input Bar */}
          <div className={`flex items-center px-4 py-3 border-b ${
            isDark ? 'border-purple-500/20' : 'border-orange-200'
          }`}>
            <Search size={18} className={`shrink-0 mr-3 ${isDark ? 'text-purple-400' : 'text-orange-600'}`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Spotlight Search apps, skills, actions..."
              className={`w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            />
            <button
              onClick={onClose}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-500/30 text-slate-400 hover:text-slate-200"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching results for "{query}"
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleExecute(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-purple-600/30 border border-purple-500/40 text-white'
                          : 'bg-orange-500/20 border border-orange-400/50 text-slate-900'
                        : 'border border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? isDark ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white'
                          : isDark ? 'bg-slate-800/80 text-purple-400' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className={`text-xs font-bold leading-snug ${
                          isSelected ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-slate-200' : 'text-slate-800')
                        }`}>
                          {item.title}
                        </div>
                        <div className="text-[10.5px] text-slate-400 leading-snug">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 opacity-60">
                      <span className="text-[9.5px] font-mono uppercase tracking-wider">{item.type}</span>
                      {isSelected && <CornerDownLeft size={12} />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className={`px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono text-slate-400 ${
            isDark ? 'bg-purple-950/20 border-purple-500/10' : 'bg-orange-50/50 border-orange-200/50'
          }`}>
            <div className="flex items-center space-x-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
            </div>
            <span>SonuOS Spotlight</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
