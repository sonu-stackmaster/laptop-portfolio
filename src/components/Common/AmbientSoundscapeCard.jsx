import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Flame, Music, Wind, Play, Pause, Sparkles, Volume2 } from 'lucide-react';
import { soundscapes } from '../../utils/soundscapes';
import { soundFx } from '../../utils/audio';

const PRESETS = [
  { id: 'midnight-rain', label: 'Midnight Rain', icon: CloudRain },
  { id: 'cozy-fireplace', label: 'Cozy Fireplace', icon: Flame },
  { id: 'lofi-cafe', label: 'Lofi Cafe', icon: Music },
  { id: 'deep-focus', label: 'Deep Focus', icon: Wind }
];

export default function AmbientSoundscapeCard({ isDark }) {
  const [engineState, setEngineState] = useState(() => soundscapes.getState());

  useEffect(() => {
    const unsub = soundscapes.subscribe((state) => {
      setEngineState({ ...state });
    });
    return unsub;
  }, []);

  const handleTogglePlay = () => {
    soundFx.playKeyClick();
    soundscapes.toggleAll();
  };

  const handleToggleTrack = (trackName) => {
    soundFx.playKeyClick();
    soundscapes.toggleTrack(trackName);
  };

  const handleVolumeChange = (trackName, val) => {
    soundscapes.setTrackVolume(trackName, val);
  };

  const handleApplyPreset = (presetId) => {
    soundFx.playKeyClick();
    soundscapes.applyPreset(presetId);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Top Banner with Master Play & Equalizer */}
      <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
        isDark ? 'bg-purple-950/40 border-purple-500/30' : 'bg-orange-50/90 border-orange-200 shadow-sm'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleTogglePlay}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
              engineState.isPlaying
                ? isDark ? 'bg-purple-600 shadow-purple-600/50' : 'bg-orange-500 shadow-orange-500/40'
                : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {engineState.isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <div>
            <div className={`text-xs font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {engineState.isPlaying ? 'Ambient Soundscape Playing' : 'Ambient Soundscape Paused'}
            </div>
            <div className={`text-[10px] font-mono ${isDark ? 'text-purple-300/80' : 'text-orange-700'}`}>
              Procedural Web Audio • Relax & Focus
            </div>
          </div>
        </div>

        {/* Animated Visual Equalizer Bars */}
        <div className="flex items-end space-x-1 h-6 px-2">
          {[40, 80, 55, 95, 60, 75].map((h, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${
                engineState.isPlaying
                  ? isDark ? 'bg-purple-400' : 'bg-orange-500'
                  : isDark ? 'bg-slate-700' : 'bg-slate-300'
              }`}
              animate={engineState.isPlaying ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] } : { height: '20%' }}
              transition={engineState.isPlaying ? { duration: 0.6 + i * 0.1, repeat: Infinity, repeatType: 'reverse' } : {}}
            />
          ))}
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div>
        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-purple-400' : 'text-orange-600'}`}>
          Atmosphere Presets
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p.id)}
                className={`flex items-center space-x-2 p-2 rounded-xl border text-left transition-all active:scale-95 ${
                  isDark 
                    ? 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-800' 
                    : 'bg-white border-orange-200 hover:border-orange-400/60 hover:bg-orange-50/50 shadow-xs'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-orange-100 text-orange-600'}`}>
                  <Icon size={14} />
                </div>
                <span className={`text-[11px] font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Multi-Channel Sound Faders */}
      <div className="space-y-2.5">
        <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-purple-400' : 'text-orange-600'}`}>
          Sound Channels
        </div>

        {[
          { id: 'rain', label: 'Rain on Glass', icon: CloudRain },
          { id: 'fire', label: 'Cozy Fireplace', icon: Flame },
          { id: 'lofi', label: 'Lofi Piano & Vinyl', icon: Music },
          { id: 'breeze', label: 'Night Breeze', icon: Wind }
        ].map((item) => {
          const Icon = item.icon;
          const trk = engineState.tracks[item.id] || { active: false, volume: 0.5 };

          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border space-y-1.5 transition-all ${
                trk.active
                  ? isDark ? 'bg-purple-900/20 border-purple-500/30' : 'bg-orange-50/70 border-orange-300 shadow-xs'
                  : isDark ? 'bg-slate-900/40 border-white/5 opacity-65' : 'bg-white border-orange-100 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleToggleTrack(item.id)}
                  className="flex items-center space-x-2 text-left"
                >
                  <div className={`p-1 rounded-lg ${
                    trk.active
                      ? isDark ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white'
                      : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Icon size={13} />
                  </div>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    {item.label}
                  </span>
                </button>
                <span className={`text-[10px] font-mono font-semibold ${isDark ? 'text-purple-300' : 'text-orange-600'}`}>
                  {trk.active ? `${Math.round(trk.volume * 100)}%` : 'Off'}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={trk.volume}
                onChange={(e) => handleVolumeChange(item.id, Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg cursor-pointer transition-all ${
                  isDark ? 'accent-purple-500 bg-slate-700/60' : 'accent-orange-500 bg-orange-200'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
