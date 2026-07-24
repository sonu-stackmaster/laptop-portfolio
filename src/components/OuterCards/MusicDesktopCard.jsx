import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Volume2, VolumeX, Shuffle, Repeat, Heart } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function MusicDesktopCard({ isDark, isMuted, onToggleSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [progress, setProgress] = useState(55);

  const togglePlay = () => {
    soundFx.playKeyClick();
    setIsPlaying((prev) => !prev);
  };

  const toggleLike = () => {
    soundFx.playKeyClick();
    setIsLiked((prev) => !prev);
  };

  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between text-center select-none ${
      isDark 
        ? 'bg-gradient-to-b from-[#140b2a] via-[#0e071e] to-[#07040f] border-purple-500/30 text-white shadow-xl' 
        : 'bg-gradient-to-b from-orange-100/90 via-amber-50 to-white border-orange-200 text-slate-900 shadow-md'
    }`}>
      {/* Top Track Badge */}
      <div className="flex items-center justify-between text-xs font-semibold px-1 mb-2">
        <span className={`text-[10px] font-mono uppercase tracking-widest ${
          isDark ? 'text-purple-400' : 'text-orange-600 font-bold'
        }`}>
          macOS APPLE MUSIC
        </span>
        <button onClick={toggleLike} className="transition-transform active:scale-90">
          <Heart size={16} className={isLiked ? "text-rose-500 fill-rose-500" : (isDark ? "text-slate-400" : "text-slate-600")} />
        </button>
      </div>

      {/* Hero Vinyl Album Artwork */}
      <div className="my-auto py-3 flex flex-col items-center justify-center relative">
        {/* Ambient Backlight Glow */}
        <div className={`absolute w-32 h-32 rounded-full blur-2xl transition-opacity duration-700 ${
          isPlaying ? 'opacity-80' : 'opacity-20'
        } ${isDark ? 'bg-purple-600' : 'bg-orange-400'}`} />

        <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center border-4 shadow-2xl transition-transform duration-700 ${
          isPlaying ? 'animate-spin scale-105' : 'scale-100'
        } ${
          isDark ? 'border-purple-500/40 bg-[#0a0514]' : 'border-orange-400/60 bg-slate-900'
        }`} style={{ animationDuration: '7s' }}>
          <Disc size={90} className="text-purple-400 opacity-80" />
          <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 border-2 border-white flex items-center justify-center shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
          </div>
        </div>
      </div>

      {/* Track Metadata */}
      <div className="space-y-1 my-2">
        <h3 className={`text-base font-extrabold font-heading tracking-tight ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          Sonu&apos;s Dev Lofi Beats
        </h3>
        <p className={`text-xs font-semibold ${
          isDark ? 'text-purple-400' : 'text-orange-600'
        }`}>
          Senior Full Stack & AI Developer • macOS Audio
        </p>
      </div>

      {/* Audio Progress Scrubber */}
      <div className="space-y-1.5 my-2">
        <div className={`w-full h-2 rounded-full overflow-hidden cursor-pointer ${
          isDark ? 'bg-purple-950/80 border border-purple-500/20' : 'bg-orange-200'
        }`} onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          setProgress(Math.round((clickX / rect.width) * 100));
        }}>
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
            style={{ width: `${isPlaying ? progress : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
          <span>{isPlaying ? '02:10' : '00:00'}</span>
          <span>03:45</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-around my-2 px-2">
        <button 
          onClick={() => { soundFx.playKeyClick(); setIsShuffle(!isShuffle); }}
          className={`p-2 rounded-full transition-colors ${
            isShuffle ? 'text-purple-400 font-bold' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600')
          }`}
        >
          <Shuffle size={16} />
        </button>

        <button 
          onClick={() => soundFx.playKeyClick()}
          className={`p-2 rounded-full ${isDark ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-orange-600'}`}
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-purple-900/50' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/40'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <button 
          onClick={() => soundFx.playKeyClick()}
          className={`p-2 rounded-full ${isDark ? 'text-slate-200 hover:text-purple-400' : 'text-slate-800 hover:text-orange-600'}`}
        >
          <SkipForward size={20} />
        </button>

        <button 
          onClick={() => { soundFx.playKeyClick(); setIsRepeat(!isRepeat); }}
          className={`p-2 rounded-full transition-colors ${
            isRepeat ? 'text-purple-400 font-bold' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600')
          }`}
        >
          <Repeat size={16} />
        </button>
      </div>

      {/* Bottom Volume Control */}
      <div className="flex items-center space-x-2 pt-2 border-t border-purple-500/20 text-xs">
        <button onClick={onToggleSound} className={isDark ? "text-slate-400 hover:text-white" : "text-slate-600"}>
          {isMuted ? <VolumeX size={14} className="text-rose-500" /> : <Volume2 size={14} />}
        </button>
        <div className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-orange-200'}`}>
          <div className={`h-full ${isMuted ? 'w-0' : 'w-3/4'} ${isDark ? 'bg-purple-400' : 'bg-orange-500'}`} />
        </div>
      </div>
    </div>
  );
}
