import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Volume2, VolumeX, Heart, Shuffle, Repeat } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function MusiciPadCard({ isDark, isMuted, onToggleSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [progress, setProgress] = useState(60);

  const togglePlay = () => {
    soundFx.playKeyClick();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={`p-4 rounded-2xl border flex flex-col justify-between text-center select-none ${
      isDark 
        ? 'bg-gradient-to-b from-[#140b2a] via-[#0e071e] to-[#07040f] border-purple-500/30 text-white shadow-xl' 
        : 'bg-gradient-to-b from-orange-100/90 via-amber-50 to-white border-orange-200 text-slate-900 shadow-md'
    }`}>
      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <span className={`text-[10px] font-mono uppercase tracking-widest ${
          isDark ? 'text-purple-400' : 'text-orange-600 font-bold'
        }`}>
          iPadOS MUSIC PLAYER
        </span>
        <button onClick={() => setIsLiked(!isLiked)}>
          <Heart size={16} className={isLiked ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
        </button>
      </div>

      <div className="my-auto py-2 flex flex-col items-center justify-center relative">
        <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 shadow-xl transition-transform duration-700 ${
          isPlaying ? 'animate-spin scale-105' : 'scale-100'
        } ${
          isDark ? 'border-purple-500/40 bg-[#0a0514]' : 'border-orange-400/60 bg-slate-900'
        }`} style={{ animationDuration: '7s' }}>
          <Disc size={76} className="text-purple-400 opacity-80" />
          <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-900" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className={`text-sm font-extrabold font-heading ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          Sonu&apos;s Dev Lofi Beats
        </h3>
        <p className={`text-xs ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          Senior Full Stack & AI Developer • iPadOS Audio
        </p>
      </div>

      <div className="space-y-1 my-2">
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${
          isDark ? 'bg-purple-950/80 border border-purple-500/20' : 'bg-orange-200'
        }`}>
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
            style={{ width: `${isPlaying ? progress : 0}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-around">
        <button onClick={() => soundFx.playKeyClick()} className={isDark ? "text-slate-300" : "text-slate-800"}>
          <SkipBack size={18} />
        </button>

        <button
          onClick={togglePlay}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform ${
            isDark ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-orange-500 to-amber-500'
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <button onClick={() => soundFx.playKeyClick()} className={isDark ? "text-slate-300" : "text-slate-800"}>
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
}
