import React from 'react';
import { Sliders, Sun, Moon, Volume2, VolumeX, Laptop, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function SettingsDesktopCard({ isDark, onToggleTheme, isMuted, onToggleSound }) {
  return (
    <div className="space-y-4 text-left">
      {/* System Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center space-x-3 ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${
          isDark ? 'bg-purple-600' : 'bg-orange-500'
        }`}>
          <Sliders size={20} />
        </div>
        <div>
          <h3 className={`text-xs font-extrabold font-heading ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            SonuOS System Preferences
          </h3>
          <p className={`text-[10px] font-mono ${isDark ? 'text-purple-400' : 'text-orange-600'}`}>
            macOS Edition v4.3
          </p>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-2.5">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          Appearance & Audio Preferences
        </h4>

        {/* Dark/Light Theme Toggle */}
        <div className={`p-3 rounded-xl border flex items-center justify-between ${
          isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2.5">
            {isDark ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-amber-500" />}
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Theme Mode
              </div>
              <div className="text-[10px] text-slate-400">
                {isDark ? 'Deep Purple Dark Mode' : 'Warm Orange Light Mode'}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playThemeSwitch();
              onToggleTheme();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-transform active:scale-95 ${
              isDark ? 'bg-purple-600 hover:bg-purple-500' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>

        {/* Sound FX Toggle */}
        <div className={`p-3 rounded-xl border flex items-center justify-between ${
          isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2.5">
            {isMuted ? <VolumeX size={18} className="text-rose-500" /> : <Volume2 size={18} className="text-emerald-500" />}
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Sound FX Audio
              </div>
              <div className="text-[10px] text-slate-400">
                {isMuted ? 'Muted' : 'Enabled'}
              </div>
            </div>
          </div>
          <button
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-transform active:scale-95 ${
              isMuted
                ? 'bg-slate-700 text-slate-300'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      </div>

      {/* System Specifications */}
      <div className={`p-3.5 rounded-xl border space-y-2 ${
        isDark ? 'bg-slate-900/40 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          <Laptop size={14} /> Desktop System Specs
        </h4>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-orange-50'}`}>
            <span className="text-slate-400 block">MODEL</span>
            <span className={`font-bold ${isDark ? 'text-purple-300' : 'text-orange-800'}`}>MacBook Pro M3 Max</span>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-orange-50'}`}>
            <span className="text-slate-400 block">GRAPHICS</span>
            <span className={`font-bold ${isDark ? 'text-purple-300' : 'text-orange-800'}`}>Three.js WebGL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
