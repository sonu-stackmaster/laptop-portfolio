import React, { useState } from 'react';
import { Phone, Copy, Check, User, Delete } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export default function PhoneMobileApp({ isDark }) {
  const { personalInfo } = portfolioData;
  const [dialedNumber, setDialedNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const handleKeyPress = (num) => {
    soundFx.playKeyClick();
    if (dialedNumber.length < 15) {
      setDialedNumber((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    soundFx.playKeyClick();
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    soundFx.playWindowOpen();
    const numberToCall = dialedNumber || personalInfo.phone;
    window.open(`tel:${numberToCall}`, '_self');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <div className={`p-3 rounded-2xl border flex flex-col justify-between h-full flex-1 min-h-[480px] text-left select-none ${
      isDark ? 'bg-slate-900/60 border-purple-500/20 text-white' : 'bg-white border-orange-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Quick Contact Card */}
      <div className={`p-3 rounded-2xl border flex items-center justify-between ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/90 border-orange-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 font-bold">
            <User size={18} />
          </div>
          <div className="truncate">
            <h4 className={`text-xs font-extrabold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {personalInfo.name}
            </h4>
            <p className={`text-[10px] font-mono font-semibold truncate ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {personalInfo.phone}
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded-lg border transition-all ${
            isDark ? 'bg-slate-900 border-purple-500/30 text-slate-300' : 'bg-white border-orange-300 text-slate-700'
          }`}
          title="Copy Phone Number"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Bottom Dial Pad Container */}
      <div className="mt-auto space-y-4 pt-4">
        {/* Dialed Number Display */}
        <div className="text-center py-2 min-h-[44px] flex items-center justify-center relative">
          <span className={`text-xl font-mono font-bold tracking-widest ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {dialedNumber || personalInfo.phone}
          </span>
          {dialedNumber && (
            <button 
              onClick={handleDelete}
              className="absolute right-2 p-1 text-slate-400 hover:text-rose-500"
            >
              <Delete size={18} />
            </button>
          )}
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-2 px-3">
          {keypad.map((row) =>
            row.map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                className={`h-12 rounded-full font-bold text-lg flex items-center justify-center transition-transform active:scale-90 ${
                  isDark
                    ? 'bg-slate-800/90 hover:bg-purple-900/50 text-slate-100 border border-purple-500/20'
                    : 'bg-orange-50 hover:bg-orange-100 text-slate-900 border border-orange-200 shadow-xs'
                }`}
              >
                {digit}
              </button>
            ))
          )}
        </div>

        {/* Call Button */}
        <div className="flex justify-center pt-2 pb-2">
          <button
            onClick={handleCall}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 active:scale-90 transition-transform"
            title="Call Sonu"
          >
            <Phone size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
