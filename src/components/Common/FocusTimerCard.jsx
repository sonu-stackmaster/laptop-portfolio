import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Sparkles, Bell, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function FocusTimerCard({ isDark }) {
  const [mode, setMode] = useState('focus'); // 'focus' (25m) or 'break' (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [coffeeSips, setCoffeeSips] = useState(3); // 3 sips per cup
  const [sipToast, setSipToast] = useState(false);
  const timerRef = useRef(null);

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            soundFx.playSpotlightChime?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleToggle = () => {
    soundFx.playKeyClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    soundFx.playKeyClick();
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleModeChange = (newMode) => {
    soundFx.playKeyClick();
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleSipCoffee = () => {
    soundFx.playKeyClick();
    if (coffeeSips > 0) {
      setCoffeeSips((prev) => prev - 1);
      setSipToast(true);
      setTimeout(() => setSipToast(false), 2200);
    } else {
      // Refill coffee
      setCoffeeSips(3);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="space-y-4 select-none">
      {/* Mode Switcher Tabs */}
      <div className={`p-1 rounded-2xl border flex items-center justify-between ${
        isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-orange-50/80 border-orange-200'
      }`}>
        <button
          onClick={() => handleModeChange('focus')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'focus'
              ? isDark ? 'bg-purple-600 text-white shadow-md' : 'bg-orange-500 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          25m Focus Flow
        </button>
        <button
          onClick={() => handleModeChange('break')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'break'
              ? isDark ? 'bg-purple-600 text-white shadow-md' : 'bg-orange-500 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          5m Cozy Break
        </button>
      </div>

      {/* Circular Countdown Display */}
      <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden ${
        isDark ? 'bg-purple-950/30 border-purple-500/30' : 'bg-white border-orange-200 shadow-sm'
      }`}>
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className={isDark ? "text-purple-950/60" : "text-orange-100"}
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              className={isDark ? "text-purple-500" : "text-orange-500"}
              strokeWidth="6"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              transition={{ duration: 0.5 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-extrabold font-mono tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {formatTime}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
              isDark ? 'text-purple-300' : 'text-orange-600'
            }`}>
              {isRunning ? 'Flowing' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center space-x-3 mt-5">
          <button
            onClick={handleToggle}
            className={`px-5 py-2.5 rounded-2xl flex items-center space-x-2 font-bold text-xs text-white shadow-lg transition-transform active:scale-95 ${
              isRunning
                ? 'bg-amber-600 shadow-amber-600/30'
                : isDark ? 'bg-purple-600 shadow-purple-600/40' : 'bg-orange-500 shadow-orange-500/30'
            }`}
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>
          <button
            onClick={handleReset}
            className={`p-2.5 rounded-2xl border transition-all ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-white/10' 
                : 'bg-orange-50 hover:bg-orange-100 text-slate-700 border-orange-200'
            }`}
            title="Reset Timer"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Interactive Steaming Coffee Desk Widget */}
      <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
        isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-3">
          {/* Animated Coffee Mug with Steam */}
          <div className="relative">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white ${
              coffeeSips > 0
                ? isDark ? 'bg-gradient-to-tr from-amber-700 to-amber-500' : 'bg-gradient-to-tr from-amber-600 to-orange-500'
                : 'bg-slate-700 text-slate-400'
            }`}>
              <Coffee size={20} />
            </div>
            {/* Steam animation dots */}
            {coffeeSips > 0 && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-amber-400/80"
                    animate={{ y: [-2, -8], opacity: [0.8, 0], scale: [1, 1.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {coffeeSips > 0 ? `Virtual Coffee (${coffeeSips} Sips Left)` : 'Cup Empty • Click to Refill'}
            </div>
            <div className="text-[10px] text-slate-400">
              {coffeeSips > 0 ? 'Click to take a sip for focus boost' : 'Brew fresh hot latte'}
            </div>
          </div>
        </div>

        <button
          onClick={handleSipCoffee}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-transform active:scale-95 ${
            coffeeSips > 0
              ? isDark ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/40' : 'bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200'
              : isDark ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white'
          }`}
        >
          {coffeeSips > 0 ? 'Take a Sip' : 'Refill Cup ☕'}
        </button>
      </div>

      {/* Sip Coffee Toast */}
      <AnimatePresence>
        {sipToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-2 rounded-xl border flex items-center justify-center space-x-2 text-xs font-bold ${
              isDark ? 'bg-amber-950/80 border-amber-500/40 text-amber-300' : 'bg-orange-100 border-orange-300 text-orange-800'
            }`}
          >
            <Sparkles size={14} className="animate-spin" />
            <span>+50 Developer Energy Boost! ⚡</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
