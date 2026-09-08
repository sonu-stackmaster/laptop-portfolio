import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  Sun, Moon, Volume2, VolumeX, Wifi, Bluetooth, Radio, 
  Sparkles, Sliders, Cpu, Activity, Zap, X, Copy, Check
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ControlCenterModal({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  isMuted,
  onToggleSound,
  screenBrightness = 100,
  onChangeScreenBrightness,
  keyboardBrightness = 80,
  onChangeKeyboardBrightness
}) {
  const containerRef = useRef(null);
  const dragControls = useDragControls();
  const [copied, setCopied] = useState(false);
  const [wifiActive, setWifiActive] = useState(true);
  const [bluetoothActive, setBluetoothActive] = useState(true);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    soundFx.playKeyClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    soundFx.playWindowClose();
    onClose();
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={containerRef}
          dragElastic={0.08}
          dragMomentum={false}
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`fixed pointer-events-auto w-[92vw] sm:w-[340px] md:w-[360px] flex flex-col rounded-2xl top-14 right-4 sm:right-8 md:right-12 ${
            isDark ? 'glass-purple shadow-2xl shadow-purple-950/60' : 'glass-orange shadow-2xl shadow-orange-500/15'
          } transition-colors duration-500 z-50`}
        >
          {/* Card Header Bar (Draggable Handle ONLY) */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className={`flex items-center justify-between px-3.5 py-2.5 cursor-grab active:cursor-grabbing select-none border-b ${
              isDark ? 'border-purple-500/20' : 'border-orange-200'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className={`p-1.5 rounded-xl ${
                isDark 
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                  : 'bg-orange-500/20 text-orange-600 border border-orange-400/40'
              }`}>
                <Sliders size={16} />
              </div>
              <div>
                <h3 className={`text-xs font-extrabold font-heading ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  Control Center
                </h3>
                <span className={`text-[9px] font-mono uppercase tracking-widest ${
                  isDark ? 'text-purple-400' : 'text-orange-600 font-bold'
                }`}>
                  SYSTEM CONTROLS
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
                title="Close Control Center"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Card Content Body */}
          <div className="p-3.5 sm:p-4 overflow-y-auto max-h-[calc(85vh-55px)] space-y-3">
            {/* Top 2x2 Quick Connectivity Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Wi-Fi Toggle */}
              <button
                onClick={() => {
                  soundFx.playKeyClick();
                  setWifiActive(!wifiActive);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-2xl border flex items-center space-x-2.5 text-left transition-all ${
                  wifiActive
                    ? isDark ? 'bg-purple-600/30 border-purple-400/40 text-white' : 'bg-orange-500/15 border-orange-400 text-slate-900 shadow-xs'
                    : isDark ? 'bg-white/5 border-transparent text-slate-400 opacity-60' : 'bg-orange-50/50 border-orange-200 text-slate-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  wifiActive ? (isDark ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white') : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600')
                }`}>
                  <Wifi size={16} />
                </div>
                <div>
                  <div className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Wi-Fi</div>
                  <div className={`text-[9.5px] leading-tight ${isDark ? 'opacity-70' : 'text-orange-700 font-medium'}`}>{wifiActive ? '5 GHz' : 'Off'}</div>
                </div>
              </button>

              {/* Bluetooth Toggle */}
              <button
                onClick={() => {
                  soundFx.playKeyClick();
                  setBluetoothActive(!bluetoothActive);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-2xl border flex items-center space-x-2.5 text-left transition-all ${
                  bluetoothActive
                    ? isDark ? 'bg-purple-600/30 border-purple-400/40 text-white' : 'bg-orange-500/15 border-orange-400 text-slate-900 shadow-xs'
                    : isDark ? 'bg-white/5 border-transparent text-slate-400 opacity-60' : 'bg-orange-50/50 border-orange-200 text-slate-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  bluetoothActive ? (isDark ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white') : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600')
                }`}>
                  <Bluetooth size={16} />
                </div>
                <div>
                  <div className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Bluetooth</div>
                  <div className={`text-[9.5px] leading-tight ${isDark ? 'opacity-70' : 'text-orange-700 font-medium'}`}>{bluetoothActive ? 'On' : 'Off'}</div>
                </div>
              </button>
            </div>

            {/* Quick Action Toggles */}
            <div className="grid grid-cols-2 gap-2">
              {/* Dark / Light Toggle */}
              <button
                onClick={() => {
                  soundFx.playThemeSwitch();
                  onToggleTheme();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-2xl border flex items-center space-x-2.5 text-left transition-all ${
                  isDark ? 'bg-slate-900/60 border-purple-500/20 hover:bg-slate-800' : 'bg-white border-orange-200 hover:bg-orange-50 shadow-xs'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-purple-900/60 text-purple-300' : 'bg-orange-100 text-orange-600'
                }`}>
                  {isDark ? <Moon size={14} /> : <Sun size={14} />}
                </div>
                <div>
                  <div className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Theme</div>
                  <div className={`text-[9.5px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{isDark ? 'Dark' : 'Light'}</div>
                </div>
              </button>

              {/* Share / Copy Link */}
              <button
                onClick={handleCopyLink}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-2xl border flex items-center space-x-2.5 text-left transition-all ${
                  isDark ? 'bg-slate-900/60 border-purple-500/20 hover:bg-slate-800' : 'bg-white border-orange-200 hover:bg-orange-50 shadow-xs'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-purple-900/60 text-purple-300' : 'bg-orange-100 text-orange-600'
                }`}>
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </div>
                <div>
                  <div className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {copied ? 'Copied!' : 'Share'}
                  </div>
                  <div className={`text-[9.5px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Portfolio URL</div>
                </div>
              </button>
            </div>

            {/* Interactive Screen Display Brightness Slider */}
            <div className={`p-3 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <Sun size={13} className={isDark ? "text-amber-400" : "text-orange-500"} /> Display Brightness
                </span>
                <span className={`font-mono text-[10px] font-semibold ${isDark ? 'text-purple-300' : 'text-orange-600'}`}>
                  {screenBrightness}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={screenBrightness}
                onChange={(e) => {
                  if (onChangeScreenBrightness) onChangeScreenBrightness(Number(e.target.value));
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={`w-full cursor-pointer h-1.5 rounded-lg transition-all ${
                  isDark ? 'accent-purple-500 bg-slate-700/60' : 'accent-orange-500 bg-orange-200/80'
                }`}
              />
            </div>

            {/* Interactive 3D Keyboard Backlight Slider */}
            <div className={`p-3 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <Zap size={13} className={isDark ? "text-purple-400" : "text-orange-500"} /> Keyboard Backlight
                </span>
                <span className={`font-mono text-[10px] font-semibold ${isDark ? 'text-purple-300' : 'text-orange-600'}`}>
                  {keyboardBrightness}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={keyboardBrightness}
                onChange={(e) => {
                  if (onChangeKeyboardBrightness) onChangeKeyboardBrightness(Number(e.target.value));
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={`w-full cursor-pointer h-1.5 rounded-lg transition-all ${
                  isDark ? 'accent-purple-500 bg-slate-700/60' : 'accent-orange-500 bg-orange-200/80'
                }`}
              />
            </div>

            {/* System Performance Status */}
            <div className={`p-2.5 rounded-2xl border flex items-center justify-between text-[10px] font-mono ${
              isDark ? 'bg-purple-950/20 border-purple-500/10 text-slate-400' : 'bg-orange-50/80 border-orange-200/80 text-orange-950'
            }`}>
              <div className="flex items-center space-x-1.5">
                <Activity size={12} className="text-emerald-500 animate-pulse" />
                <span className="font-semibold">SonuOS 60 FPS</span>
              </div>
              <span className={isDark ? 'text-slate-400' : 'text-orange-800 font-medium'}>WebGL Hardware Accel</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
