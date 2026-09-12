import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pin, Sparkles, Check } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const NOTE_COLORS = [
  { id: 'yellow', label: 'Yellow', bgDark: 'bg-amber-950/60 border-amber-500/40 text-amber-100', bgLight: 'bg-amber-50 border-amber-300 text-amber-950' },
  { id: 'peach', label: 'Peach', bgDark: 'bg-orange-950/60 border-orange-500/40 text-orange-100', bgLight: 'bg-orange-50 border-orange-300 text-orange-950' },
  { id: 'mint', label: 'Mint', bgDark: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-100', bgLight: 'bg-emerald-50 border-emerald-300 text-emerald-950' },
  { id: 'lavender', label: 'Lavender', bgDark: 'bg-purple-950/60 border-purple-500/40 text-purple-100', bgLight: 'bg-purple-50 border-purple-300 text-purple-950' },
  { id: 'sky', label: 'Sky Blue', bgDark: 'bg-sky-950/60 border-sky-500/40 text-sky-100', bgLight: 'bg-sky-50 border-sky-300 text-sky-950' }
];

const DEFAULT_NOTES = [
  { id: 'note-1', color: 'yellow', text: '🎯 2026 Goal: Architecting multi-agent AI ecosystems & WebGL 3D web apps.', date: 'Today' },
  { id: 'note-2', color: 'lavender', text: '💡 Quick tip: Hit ⌘K on desktop to open Spotlight Search from anywhere.', date: 'Tip' },
  { id: 'note-3', color: 'mint', text: '☕ Coffee status: Always full. Ready for high-scale frontend challenges.', date: 'Bio' }
];

export default function StickyNotesApp({ isDark }) {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sonu_os_stickies');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return DEFAULT_NOTES;
  });

  const [selectedColor, setSelectedColor] = useState('yellow');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sonu_os_stickies', JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    soundFx.playKeyClick();
    const newNote = {
      id: `note-${Date.now()}`,
      color: selectedColor,
      text: '✍️ New developer note...',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotes([newNote, ...notes]);
  };

  const handleUpdateText = (id, newText) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: newText } : n)));
  };

  const handleDeleteNote = (id) => {
    soundFx.playWindowClose();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-3.5 select-none">
      {/* Top Creation Bar */}
      <div className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
        isDark ? 'bg-purple-950/30 border-purple-500/20' : 'bg-white border-orange-200 shadow-xs'
      }`}>
        {/* Color Palette Selector */}
        <div className="flex items-center space-x-1.5">
          {NOTE_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedColor(c.id)}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                c.id === 'yellow' ? 'bg-amber-400 border-amber-600' :
                c.id === 'peach' ? 'bg-orange-400 border-orange-600' :
                c.id === 'mint' ? 'bg-emerald-400 border-emerald-600' :
                c.id === 'lavender' ? 'bg-purple-400 border-purple-600' :
                'bg-sky-400 border-sky-600'
              } ${selectedColor === c.id ? 'scale-115 shadow-md' : 'opacity-70 hover:opacity-100'}`}
              title={c.label}
            />
          ))}
        </div>

        <button
          onClick={handleAddNote}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md transition-transform active:scale-95 ${
            isDark ? 'bg-purple-600 hover:bg-purple-500' : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          <Plus size={14} />
          <span>New Note</span>
        </button>
      </div>

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1">
        <AnimatePresence>
          {notes.map((note) => {
            const colorConf = NOTE_COLORS.find((c) => c.id === note.color) || NOTE_COLORS[0];
            const colorClass = isDark ? colorConf.bgDark : colorConf.bgLight;

            return (
              <motion.div
                key={note.id}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -10 }}
                className={`p-3.5 rounded-2xl border shadow-sm flex flex-col justify-between relative space-y-2 ${colorClass}`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 font-mono">
                  <span className="flex items-center space-x-1">
                    <Pin size={11} className="rotate-45" />
                    <span>{note.date}</span>
                  </span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 rounded-md opacity-60 hover:opacity-100 hover:text-rose-500 transition-opacity"
                    title="Delete Note"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <textarea
                  value={note.text}
                  onChange={(e) => handleUpdateText(note.id, e.target.value)}
                  rows={3}
                  className="w-full bg-transparent resize-none text-xs font-medium outline-none leading-relaxed"
                  placeholder="Write your note..."
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
