import React, { useEffect, useRef } from 'react';

// ==========================================
// 1. COSMIC & SCI-FI WALLPAPERS
// ==========================================

// 1.1 Cyber Nebula
function NebulaWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.3,
      phase: Math.random() * Math.PI * 2
    }));

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(t * 1.5 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(216, 180, 254, ${a})` : `rgba(251, 146, 60, ${a})`;
        ctx.fill();
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    const handleResize = () => {
      if (canvas.parentElement) {
        w = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className={`absolute -top-1/4 -left-1/4 w-[120%] h-[120%] rounded-full blur-[90px] opacity-70 transition-all duration-1000 ${
        isDark ? 'bg-gradient-to-br from-purple-900/60 via-indigo-950/70 to-fuchsia-900/40' : 'bg-gradient-to-br from-orange-200/80 via-amber-100/90 to-rose-200/70'
      } animate-nebula-spin`} />
      <div className={`absolute top-1/3 -right-1/4 w-[90%] h-[90%] rounded-full blur-[80px] opacity-60 transition-all duration-1000 ${
        isDark ? 'bg-gradient-to-tl from-cyan-900/50 via-purple-900/60 to-pink-900/50' : 'bg-gradient-to-tl from-rose-300/60 via-orange-200/70 to-amber-200/60'
      } animate-nebula-float`} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-80" />
    </div>
  );
}

// 1.2 Warp Starfield
function StarfieldWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const stars = Array.from({ length: 130 }, () => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * w
    }));

    const render = () => {
      ctx.fillStyle = isDark ? 'rgba(5, 3, 14, 0.3)' : 'rgba(255, 250, 242, 0.3)';
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      stars.forEach((s) => {
        s.z -= 2.5;
        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
        }
        const k = 180 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;
        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const sz = Math.max(0.6, (1 - s.z / w) * 2.8);
          const a = Math.min(1, Math.max(0.2, (1 - s.z / w) * 1.2));
          ctx.beginPath();
          ctx.arc(px, py, sz, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(192, 132, 252, ${a})` : `rgba(249, 115, 22, ${a})`;
          ctx.fill();
        }
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// 1.3 Black Hole Singularity
function BlackHoleWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center transition-colors duration-700 ${
      isDark ? 'bg-[#030108]' : 'bg-[#fff7ee]'
    }`}>
      <div className={`absolute w-[450px] h-[450px] rounded-full blur-[70px] opacity-75 animate-spin-ultra-slow ${
        isDark ? 'bg-gradient-to-tr from-amber-600 via-purple-700 to-rose-600' : 'bg-gradient-to-tr from-orange-400 via-rose-300 to-amber-200'
      }`} />
      <div className={`w-72 h-72 rounded-full border-4 animate-spin-slow ${
        isDark ? 'border-amber-400/60 shadow-[0_0_80px_rgba(245,158,11,0.6)]' : 'border-orange-500/60 shadow-[0_0_60px_rgba(249,115,22,0.4)]'
      }`} style={{ transform: 'rotateX(75deg)' }} />
      <div className="absolute w-24 h-24 rounded-full bg-black shadow-2xl" />
    </div>
  );
}

// 1.4 Solar Flare Corona
function SolarFlareWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center transition-colors duration-700 ${
      isDark ? 'bg-[#0a0204]' : 'bg-[#fff5eb]'
    }`}>
      <div className={`w-[360px] h-[360px] rounded-full blur-[60px] opacity-80 animate-ambient-breathe-1 ${
        isDark ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-red-600' : 'bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300'
      }`} />
      <div className={`w-52 h-52 rounded-full blur-[20px] ${
        isDark ? 'bg-gradient-to-tr from-yellow-400 via-amber-500 to-rose-600 shadow-[0_0_100px_rgba(245,158,11,0.8)]' : 'bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-400 shadow-[0_0_80px_rgba(245,158,11,0.5)]'
      }`} />
    </div>
  );
}

// 1.5 Quantum Collider
function QuantumFieldWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center transition-colors duration-700 ${
      isDark ? 'bg-[#030712]' : 'bg-[#f4faff]'
    }`}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`absolute rounded-full border border-dashed animate-spin-ultra-slow ${
            isDark ? 'border-cyan-400/40' : 'border-blue-400/50'
          }`}
          style={{
            width: `${i * 140}px`,
            height: `${i * 140}px`,
            animationDuration: `${20 / i}s`,
            transform: `rotate(${i * 45}deg)`
          }}
        />
      ))}
      <div className={`w-32 h-32 rounded-full blur-[35px] ${
        isDark ? 'bg-cyan-500/50' : 'bg-sky-400/50'
      }`} />
    </div>
  );
}

// ==========================================
// 2. COZY & ATMOSPHERIC WALLPAPERS
// ==========================================

// 2.1 Neon Cyber Rain (Realistic Glass Droplets, Trickling Trails & Bottom Splashes)
function NeonRainWallpaper({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();

    let w = canvas.width;
    let h = canvas.height;

    // 1. Fast Background Falling Rain
    const bgRain = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() * 26 + 14,
      spd: Math.random() * 7 + 8,
      opacity: Math.random() * 0.35 + 0.15
    }));

    // 2. Clinging Static/Growing Glass Water Droplets
    const glassDrops = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * (h - 20) + 10,
      r: Math.random() * 3.5 + 2.0,
      opacity: Math.random() * 0.4 + 0.5
    }));

    // 3. Trickling Rain Droplets sliding down glass
    const tricklers = Array.from({ length: 9 }, () => ({
      x: Math.random() * w,
      y: Math.random() * (h * 0.6),
      r: Math.random() * 3 + 3.5,
      spd: Math.random() * 1.5 + 0.6,
      trail: [],
      stepTimer: Math.random() * 20
    }));

    // 4. Bottom Splashes & Pool Ripples
    const splashes = [];
    const createSplash = (x, y) => {
      splashes.push({
        x,
        y: y - Math.random() * 4,
        r: 1,
        maxR: Math.random() * 9 + 5,
        alpha: 0.8,
        particles: Array.from({ length: 3 }, () => ({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 2.5 + 1.2),
          r: Math.random() * 1.5 + 0.8,
          alpha: 0.9
        }))
      });
    };

    // Helper to draw realistic 3D glass water droplet with highlight & shadow
    const drawRealisticDroplet = (x, y, r, alpha) => {
      // Main water body
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(186, 230, 253, ${alpha * 0.35})`
        : `rgba(59, 130, 246, ${alpha * 0.3})`;
      ctx.fill();

      // Outer refractive meniscus outline
      ctx.strokeStyle = isDark
        ? `rgba(224, 242, 254, ${alpha * 0.65})`
        : `rgba(37, 99, 235, ${alpha * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Bright specular glint / reflection highlight (top-left)
      ctx.beginPath();
      ctx.arc(x - r * 0.35, y - r * 0.35, Math.max(0.6, r * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fill();

      // Secondary soft reflection (bottom-right)
      ctx.beginPath();
      ctx.arc(x + r * 0.25, y + r * 0.25, Math.max(0.4, r * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(147, 197, 253, ${alpha * 0.5})`
        : `rgba(96, 165, 250, ${alpha * 0.4})`;
      ctx.fill();
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, w, h);

      // --- Draw Falling Background Rain ---
      bgRain.forEach((d) => {
        d.y += d.spd;
        d.x -= 0.5; // slight slant
        if (d.y > h - 10) {
          if (Math.random() > 0.4) createSplash(d.x, h - 3);
          d.y = -d.len;
          d.x = Math.random() * (w + 50);
        }
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.len);
        ctx.strokeStyle = isDark
          ? `rgba(186, 230, 253, ${d.opacity})`
          : `rgba(96, 165, 250, ${d.opacity * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // --- Draw Static Clinging Glass Droplets ---
      glassDrops.forEach((gd) => {
        drawRealisticDroplet(gd.x, gd.y, gd.r, gd.opacity);
      });

      // --- Draw Trickling Dripping Droplets with Wet Water Trails ---
      tricklers.forEach((tr) => {
        tr.stepTimer--;
        if (tr.stepTimer <= 0) {
          tr.y += tr.spd * (1 + Math.random() * 1.5);
          tr.x += (Math.random() - 0.5) * 0.6; // subtle meandering
          tr.stepTimer = Math.random() * 8 + 2;

          // Add trail point
          if (tr.trail.length < 18) {
            tr.trail.push({ x: tr.x, y: tr.y, r: tr.r * 0.35, alpha: 0.6 });
          }
        }

        // Draw water trail behind trickling drop
        tr.trail.forEach((tp) => {
          tp.alpha -= 0.003;
          if (tp.alpha > 0.1) {
            drawRealisticDroplet(tp.x, tp.y, tp.r, tp.alpha);
          }
        });
        tr.trail = tr.trail.filter((tp) => tp.alpha > 0.1);

        // Draw head droplet
        drawRealisticDroplet(tr.x, tr.y, tr.r, 0.9);

        // Reset if reached bottom with splash
        if (tr.y > h - 8) {
          createSplash(tr.x, h - 4);
          tr.y = Math.random() * (h * 0.3);
          tr.x = Math.random() * w;
          tr.trail = [];
        }
      });

      // --- Draw Bottom Splash Ripples and Puddle Beads ---
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.r += 0.45;
        s.alpha -= 0.035;

        // Expanding water ripple ring at base
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.r, s.r * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(186, 230, 253, ${s.alpha})`
          : `rgba(59, 130, 246, ${s.alpha * 0.8})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Splash bounce micro-droplets
        s.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.18; // gravity
          p.alpha -= 0.035;
          if (p.alpha > 0) {
            drawRealisticDroplet(p.x, p.y, p.r, p.alpha);
          }
        });
        ctx.restore();

        if (s.alpha <= 0) {
          splashes.splice(i, 1);
        }
      }

      // --- Bottom Water Droplet Condensation Pooling Line ---
      const bottomDropletCount = 18;
      for (let j = 0; j < bottomDropletCount; j++) {
        const bx = (w / bottomDropletCount) * j + (j % 2 === 0 ? 8 : 16);
        const by = h - (4 + (j % 3) * 3);
        const br = 2.2 + (j % 3) * 0.8;
        drawRealisticDroplet(bx, by, br, 0.7);
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      resize();
      w = canvas.width;
      h = canvas.height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Background Neon City Bokeh Lights */}
      <div className={`absolute -top-10 -left-10 w-72 h-72 rounded-full blur-[80px] opacity-45 animate-pulse ${
        isDark ? 'bg-purple-600/50' : 'bg-blue-300/60'
      }`} />
      <div className={`absolute top-1/3 right-10 w-80 h-80 rounded-full blur-[90px] opacity-40 animate-ambient-breathe-1 ${
        isDark ? 'bg-cyan-500/40' : 'bg-sky-300/50'
      }`} />
      <div className={`absolute bottom-4 left-1/3 w-64 h-64 rounded-full blur-[75px] opacity-35 ${
        isDark ? 'bg-pink-600/40' : 'bg-rose-200/50'
      }`} />

      {/* Realistic Glass & Droplets Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
    </div>
  );
}

// 2.2 Cozy Fireplace
function CozyFireplaceWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const embers = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * 50,
      r: Math.random() * 2.5 + 0.8,
      vy: Math.random() * 1.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.8 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      embers.forEach((e) => {
        e.y -= e.vy;
        e.x += e.vx;
        if (e.y < 0) {
          e.y = h;
          e.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(251, 146, 60, ${e.alpha})` : `rgba(234, 88, 12, ${e.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ea580c';
        ctx.fill();
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#0f0403]' : 'bg-[#fff5ea]'
    }`}>
      <div className={`absolute bottom-0 left-0 w-full h-[65%] blur-[70px] opacity-70 animate-ambient-breathe-1 ${
        isDark ? 'bg-gradient-to-t from-orange-600 via-amber-700 to-transparent' : 'bg-gradient-to-t from-orange-300 via-amber-200 to-transparent'
      }`} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// 2.3 Sakura Petal Breeze
function CherryBlossomWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const petals = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 7 + 4,
      vx: Math.random() * 1.2 + 0.6,
      vy: Math.random() * 0.8 + 0.4,
      rot: Math.random() * 360,
      vrot: Math.random() * 1.5 - 0.75
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.x > w) p.x = -10;
        if (p.y > h) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(244, 114, 182, 0.65)' : 'rgba(251, 113, 133, 0.55)';
        ctx.fill();
        ctx.restore();
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#0f040c]' : 'bg-[#fff5f9]'
    }`}>
      <div className={`absolute inset-0 blur-[90px] opacity-40 ${
        isDark ? 'bg-gradient-to-tr from-pink-900 via-purple-950 to-rose-950' : 'bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-100'
      }`} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// 2.4 Silent Mountain Snow
function SnowfallWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const flakes = Array.from({ length: 65 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.8,
      vy: Math.random() * 1.0 + 0.5,
      vx: (Math.random() - 0.5) * 0.4
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      flakes.forEach((f) => {
        f.y += f.vy;
        f.x += f.vx;
        if (f.y > h) f.y = -5;
        if (f.x > w) f.x = 0;
        if (f.x < 0) f.x = w;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(224, 231, 255, 0.7)' : 'rgba(147, 197, 253, 0.6)';
        ctx.fill();
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#050814]' : 'bg-[#f4f8ff]'
    }`}>
      <div className={`absolute inset-0 blur-[90px] opacity-40 ${
        isDark ? 'bg-gradient-to-t from-indigo-950 via-slate-900 to-cyan-950' : 'bg-gradient-to-t from-blue-100 via-sky-50 to-indigo-50'
      }`} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// 2.5 Autumn Amber Breeze
function AutumnBreezeWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#0f0702]' : 'bg-[#fff8ee]'
    }`}>
      <div className={`absolute -top-10 -left-10 w-[110%] h-[110%] blur-[80px] opacity-50 animate-ambient-breathe-1 ${
        isDark ? 'bg-gradient-to-br from-amber-700 via-orange-800 to-yellow-900' : 'bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-100'
      }`} />
    </div>
  );
}

// 2.6 Nordic Aurora Borealis
function AuroraBorealisWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#020d0f]' : 'bg-[#f0faf8]'
    }`}>
      <div className={`absolute top-0 left-0 w-full h-[80%] blur-[75px] opacity-65 animate-wave-slow ${
        isDark ? 'bg-gradient-to-b from-emerald-600/60 via-teal-500/40 to-transparent' : 'bg-gradient-to-b from-emerald-300/60 via-teal-200/40 to-transparent'
      }`} />
      <div className={`absolute top-10 right-0 w-[80%] h-[70%] blur-[85px] opacity-50 animate-wave-fast ${
        isDark ? 'bg-gradient-to-bl from-indigo-600/50 via-teal-400/30 to-transparent' : 'bg-gradient-to-bl from-indigo-300/40 via-teal-200/30 to-transparent'
      }`} />
    </div>
  );
}

// ==========================================
// 3. MACOS & FLUID DYNAMICS
// ==========================================

// 3.1 macOS Sonoma Waves
function SonomaWavesWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#080214]' : 'bg-[#fff8f0]'
    }`}>
      <div className={`absolute inset-0 blur-[70px] opacity-50 ${
        isDark ? 'bg-gradient-to-tr from-purple-950 via-indigo-950 to-pink-950' : 'bg-gradient-to-tr from-orange-100 via-amber-100 to-rose-100'
      }`} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path className="animate-wave-slow" fill={isDark ? "rgba(139, 92, 246, 0.35)" : "rgba(249, 115, 22, 0.35)"} d="M0,320 C320,180 440,460 720,340 C1000,220 1180,480 1440,310 L1440,900 L0,900 Z" />
        <path className="animate-wave-medium opacity-75" fill={isDark ? "rgba(217, 70, 239, 0.3)" : "rgba(251, 146, 60, 0.3)"} d="M0,450 C240,580 480,320 780,470 C1080,620 1260,350 1440,480 L1440,900 L0,900 Z" />
      </svg>
    </div>
  );
}

// 3.2 macOS Monterey Fluid
function MontereyGlowWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#090317]' : 'bg-[#fff5fc]'
    }`}>
      <div className={`absolute -top-10 left-10 w-[80%] h-[80%] rounded-full blur-[90px] opacity-60 animate-nebula-float ${
        isDark ? 'bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-900' : 'bg-gradient-to-br from-rose-300 via-purple-200 to-amber-100'
      }`} />
    </div>
  );
}

// 3.3 macOS Ventura Petals
function VenturaBloomWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#100502]' : 'bg-[#fffaf0]'
    }`}>
      <div className={`absolute top-1/4 left-1/4 w-[75%] h-[75%] rounded-full blur-[80px] opacity-65 animate-ambient-breathe-1 ${
        isDark ? 'bg-gradient-to-tr from-amber-600 via-orange-600 to-rose-700' : 'bg-gradient-to-tr from-amber-300 via-orange-200 to-rose-200'
      }`} />
    </div>
  );
}

// 3.4 Liquid Chrome Mercury
function LiquidMercuryWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#08080d]' : 'bg-[#f4f5f8]'
    }`}>
      <div className={`absolute inset-0 blur-[60px] opacity-40 animate-wave-slow ${
        isDark ? 'bg-gradient-to-r from-slate-700 via-zinc-600 to-purple-950' : 'bg-gradient-to-r from-slate-300 via-zinc-200 to-orange-100'
      }`} />
    </div>
  );
}

// 3.5 Deep Abyss Bioluminescence
function BioluminescentOceanWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#010912]' : 'bg-[#edf9fc]'
    }`}>
      <div className={`absolute bottom-0 left-0 w-full h-[70%] blur-[80px] opacity-60 animate-ambient-breathe-2 ${
        isDark ? 'bg-gradient-to-t from-cyan-600 via-teal-700 to-transparent' : 'bg-gradient-to-t from-cyan-200 via-teal-100 to-transparent'
      }`} />
    </div>
  );
}

// ==========================================
// 4. CYBERPUNK & GEOMETRIC
// ==========================================

// 4.1 Cyber Grid
function CyberGridWallpaper({ isDark }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-[#050512]' : 'bg-[#fffbf0]'}`} />
      <div className={`absolute bottom-0 left-0 w-full h-[55%] animate-grid-flow`} style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, rgba(56, 189, 248, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.45) 1px, transparent 1px)`
          : `linear-gradient(to right, rgba(249, 115, 22, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.45) 1px, transparent 1px)`,
        backgroundSize: '40px 30px',
        transform: 'perspective(200px) rotateX(60deg)',
        transformOrigin: 'bottom center'
      }} />
      <div className={`absolute left-0 w-full h-[3px] shadow-lg animate-laser-scan ${isDark ? 'bg-cyan-400 shadow-cyan-500/80' : 'bg-orange-500 shadow-orange-500/80'}`} />
    </div>
  );
}

// 4.2 Matrix Digital Code Rain
function DigitalRainWallpaper({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const cols = Math.floor(w / 18);
    const ypos = Array(cols).fill(0);

    const render = () => {
      ctx.fillStyle = isDark ? 'rgba(3, 8, 4, 0.15)' : 'rgba(240, 255, 244, 0.15)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = isDark ? '#10b981' : '#059669';
      ctx.font = '12pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 18;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 16;
      });
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// 4.3 Hex Matrix
function HexMatrixWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center transition-colors duration-700 ${
      isDark ? 'bg-[#030718]' : 'bg-[#f4f7ff]'
    }`}>
      <div className={`w-80 h-80 rounded-3xl border-2 animate-spin-ultra-slow ${
        isDark ? 'border-blue-500/30 shadow-[0_0_80px_rgba(59,130,246,0.3)]' : 'border-amber-400/40 shadow-[0_0_60px_rgba(245,158,11,0.2)]'
      }`} style={{ transform: 'rotate(45deg)' }} />
      <div className={`absolute w-44 h-44 rounded-full blur-[40px] ${
        isDark ? 'bg-cyan-600/40' : 'bg-orange-400/40'
      }`} />
    </div>
  );
}

// 4.4 Iridescent Glass Shards
function GeometricShardsWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#090417]' : 'bg-[#fffaf3]'
    }`}>
      <div className={`absolute top-6 left-10 w-44 h-44 rounded-3xl border backdrop-blur-md animate-shard-float-1 ${
        isDark ? 'bg-gradient-to-tr from-purple-600/20 to-pink-600/10 border-purple-500/30' : 'bg-gradient-to-tr from-orange-400/20 to-rose-400/10 border-orange-400/30'
      }`} />
      <div className={`absolute top-20 right-12 w-56 h-56 rounded-[40px] border backdrop-blur-lg animate-shard-float-2 ${
        isDark ? 'bg-gradient-to-br from-indigo-600/20 via-fuchsia-600/15 to-transparent border-fuchsia-500/30' : 'bg-gradient-to-br from-amber-400/20 via-orange-400/15 to-transparent border-rose-400/30'
      }`} />
    </div>
  );
}

// 4.5 Synthwave Neon Skyline
function IsometricSkylineWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex flex-col justify-end transition-colors duration-700 ${
      isDark ? 'bg-[#080214]' : 'bg-[#fff5ee]'
    }`}>
      <div className={`w-36 h-36 rounded-full self-center blur-[2px] mb-[-40px] ${
        isDark ? 'bg-gradient-to-t from-pink-500 via-rose-500 to-amber-400' : 'bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-200'
      }`} />
      <div className={`w-full h-40 border-t animate-grid-flow ${
        isDark ? 'bg-[#0d0422] border-pink-500/40' : 'bg-orange-50 border-orange-300'
      }`} />
    </div>
  );
}

// ==========================================
// 5. MINIMALIST & AMBIENT
// ==========================================

// 5.1 Zen Sunset Luminescence
function AmbientSunsetWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#0d0412]' : 'bg-[#fff7ee]'
    }`}>
      <div className={`absolute top-1/4 left-1/4 w-[90%] h-[90%] rounded-full blur-[100px] opacity-70 animate-ambient-breathe-1 ${
        isDark ? 'bg-gradient-to-tr from-purple-800 via-rose-900 to-amber-900' : 'bg-gradient-to-tr from-amber-300 via-orange-200 to-rose-200'
      }`} />
    </div>
  );
}

// 5.2 Golden Hour Radiance
function GoldenHourWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#0d0701]' : 'bg-[#fffbf0]'
    }`}>
      <div className={`absolute top-1/3 left-1/3 w-[85%] h-[85%] rounded-full blur-[90px] opacity-60 animate-ambient-breathe-2 ${
        isDark ? 'bg-gradient-to-tr from-amber-600 via-orange-700 to-yellow-800' : 'bg-gradient-to-tr from-amber-200 via-yellow-100 to-orange-200'
      }`} />
    </div>
  );
}

// 5.3 Dreamy Pastel Clouds
function PastelCloudsWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#080512]' : 'bg-[#faf4ff]'
    }`}>
      <div className={`absolute top-10 left-10 w-[70%] h-[70%] rounded-full blur-[80px] opacity-55 animate-nebula-float ${
        isDark ? 'bg-gradient-to-tr from-purple-800 via-indigo-900 to-rose-900' : 'bg-gradient-to-tr from-pink-200 via-purple-100 to-orange-100'
      }`} />
    </div>
  );
}

// 5.4 Obsidian Minimal
function ObsidianMinimalWallpaper({ isDark }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? 'bg-[#040208]' : 'bg-[#fcfaf7]'
    }`}>
      <div className={`absolute bottom-0 left-0 w-full h-32 blur-[60px] opacity-35 ${
        isDark ? 'bg-purple-600' : 'bg-orange-400'
      }`} />
    </div>
  );
}

// ==========================================
// MAIN LIVE WALLPAPER DISPATCHER (25 PRESETS)
// ==========================================
export default function LiveWallpaper({ wallpaperId = 'cyber-nebula', isDark = true }) {
  switch (wallpaperId) {
    // Cosmic
    case 'starfield-warp': return <StarfieldWallpaper isDark={isDark} />;
    case 'black-hole': return <BlackHoleWallpaper isDark={isDark} />;
    case 'solar-flare': return <SolarFlareWallpaper isDark={isDark} />;
    case 'quantum-field': return <QuantumFieldWallpaper isDark={isDark} />;

    // Cozy
    case 'neon-rain': return <NeonRainWallpaper isDark={isDark} />;
    case 'cozy-fireplace': return <CozyFireplaceWallpaper isDark={isDark} />;
    case 'cherry-blossom': return <CherryBlossomWallpaper isDark={isDark} />;
    case 'snowfall': return <SnowfallWallpaper isDark={isDark} />;
    case 'autumn-breeze': return <AutumnBreezeWallpaper isDark={isDark} />;
    case 'aurora-borealis': return <AuroraBorealisWallpaper isDark={isDark} />;

    // macOS
    case 'sonoma-waves': return <SonomaWavesWallpaper isDark={isDark} />;
    case 'monterey-glow': return <MontereyGlowWallpaper isDark={isDark} />;
    case 'ventura-bloom': return <VenturaBloomWallpaper isDark={isDark} />;
    case 'liquid-mercury': return <LiquidMercuryWallpaper isDark={isDark} />;
    case 'bioluminescent-ocean': return <BioluminescentOceanWallpaper isDark={isDark} />;

    // Cyberpunk & Tech
    case 'cyber-grid': return <CyberGridWallpaper isDark={isDark} />;
    case 'digital-rain': return <DigitalRainWallpaper isDark={isDark} />;
    case 'hex-matrix': return <HexMatrixWallpaper isDark={isDark} />;
    case 'geometric-shards': return <GeometricShardsWallpaper isDark={isDark} />;
    case 'isometric-skyline': return <IsometricSkylineWallpaper isDark={isDark} />;

    // Ambient
    case 'ambient-sunset': return <AmbientSunsetWallpaper isDark={isDark} />;
    case 'golden-hour': return <GoldenHourWallpaper isDark={isDark} />;
    case 'pastel-clouds': return <PastelCloudsWallpaper isDark={isDark} />;
    case 'obsidian-minimal': return <ObsidianMinimalWallpaper isDark={isDark} />;

    // Default
    case 'cyber-nebula':
    default:
      return <NebulaWallpaper isDark={isDark} />;
  }
}
