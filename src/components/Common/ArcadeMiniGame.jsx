import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const GRID_SIZE = 16;
const CELL_SIZE = 16;

export default function ArcadeMiniGame({ isDark }) {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 8, y: 8 },
    { x: 8, y: 9 },
    { x: 8, y: 10 }
  ]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [bug, setBug] = useState({ x: 4, y: 4 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('sonu_os_snake_hi') || 0);
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const dirRef = useRef(direction);
  dirRef.current = direction;

  // Generate random bug location
  const spawnBug = (currentSnake) => {
    let newBug;
    while (true) {
      newBug = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      if (!currentSnake.some((s) => s.x === newBug.x && s.y === newBug.y)) {
        break;
      }
    }
    return newBug;
  };

  const handleStartGame = () => {
    soundFx.playKeyClick();
    const initialSnake = [
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 }
    ];
    setSnake(initialSnake);
    setDirection({ x: 0, y: -1 });
    setBug(spawnBug(initialSnake));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || gameOver) return;

      const key = e.key.toLowerCase();
      const current = dirRef.current;

      if ((key === 'arrowup' || key === 'w') && current.y !== 1) {
        e.preventDefault();
        setDirection({ x: 0, y: -1 });
      } else if ((key === 'arrowdown' || key === 's') && current.y !== -1) {
        e.preventDefault();
        setDirection({ x: 0, y: 1 });
      } else if ((key === 'arrowleft' || key === 'a') && current.x !== 1) {
        e.preventDefault();
        setDirection({ x: -1, y: 0 });
      } else if ((key === 'arrowright' || key === 'd') && current.x !== -1) {
        e.preventDefault();
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y
        };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          soundFx.playWindowClose();
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          soundFx.playWindowClose();
          return prevSnake;
        }

        const nextSnake = [newHead, ...prevSnake];

        // Eat bug
        if (newHead.x === bug.x && newHead.y === bug.y) {
          soundFx.playKeyClick();
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              if (typeof window !== 'undefined') {
                localStorage.setItem('sonu_os_snake_hi', String(nextScore));
              }
            }
            return nextScore;
          });
          setBug(spawnBug(nextSnake));
        } else {
          nextSnake.pop();
        }

        return nextSnake;
      });
    }, 130);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, bug, highScore]);

  // Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Grid
    ctx.fillStyle = isDark ? '#0b0816' : '#fffaf3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(249, 115, 22, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw Bug (Target)
    ctx.fillStyle = isDark ? '#ec4899' : '#f97316';
    ctx.shadowColor = isDark ? '#ec4899' : '#f97316';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(
      bug.x * CELL_SIZE + CELL_SIZE / 2,
      bug.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw Snake
    snake.forEach((seg, idx) => {
      const isHead = idx === 0;
      ctx.fillStyle = isHead
        ? isDark ? '#a855f7' : '#ea580c'
        : isDark ? '#7c3aed' : '#fb923c';

      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL_SIZE + 1.5,
        seg.y * CELL_SIZE + 1.5,
        CELL_SIZE - 3,
        CELL_SIZE - 3,
        isHead ? 4 : 2
      );
      ctx.fill();
    });
  }, [snake, bug, isDark]);

  return (
    <div className="flex flex-col items-center select-none space-y-3">
      {/* Score Header */}
      <div className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
        isDark ? 'bg-purple-950/40 border-purple-500/20' : 'bg-orange-50/80 border-orange-200'
      }`}>
        <div className="flex items-center space-x-1.5">
          <Sparkles size={14} className={isDark ? "text-purple-400" : "text-orange-500"} />
          <span className="font-bold">Score: {score}</span>
        </div>
        <div className="flex items-center space-x-1.5 opacity-80">
          <Trophy size={14} className="text-amber-400" />
          <span>Best: {highScore}</span>
        </div>
      </div>

      {/* Retro Canvas */}
      <div className={`relative rounded-2xl overflow-hidden border shadow-lg ${
        isDark ? 'border-purple-500/30' : 'border-orange-300'
      }`}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="block"
        />

        {/* Overlay when game is paused or over */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-black/65 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
            {gameOver && (
              <div className="text-rose-400 font-extrabold text-sm mb-1 animate-bounce">
                GAME OVER!
              </div>
            )}
            <button
              onClick={handleStartGame}
              className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 text-xs font-bold text-white shadow-lg transition-transform active:scale-95 ${
                isDark ? 'bg-purple-600 hover:bg-purple-500' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {gameOver ? <RotateCcw size={14} /> : <Play size={14} />}
              <span>{gameOver ? 'Try Again' : 'Play Cyber Bug'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile / Screen D-Pad Touch Controls */}
      <div className="flex flex-col items-center space-y-1 pt-1">
        <button
          onClick={() => dirRef.current.y !== 1 && setDirection({ x: 0, y: -1 })}
          className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-white/10 text-slate-200 active:bg-purple-600' : 'bg-white border-orange-200 text-slate-800 active:bg-orange-500'}`}
        >
          <ArrowUp size={16} />
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => dirRef.current.x !== 1 && setDirection({ x: -1, y: 0 })}
            className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-white/10 text-slate-200 active:bg-purple-600' : 'bg-white border-orange-200 text-slate-800 active:bg-orange-500'}`}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => dirRef.current.y !== -1 && setDirection({ x: 0, y: 1 })}
            className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-white/10 text-slate-200 active:bg-purple-600' : 'bg-white border-orange-200 text-slate-800 active:bg-orange-500'}`}
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => dirRef.current.x !== -1 && setDirection({ x: 1, y: 0 })}
            className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-white/10 text-slate-200 active:bg-purple-600' : 'bg-white border-orange-200 text-slate-800 active:bg-orange-500'}`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
