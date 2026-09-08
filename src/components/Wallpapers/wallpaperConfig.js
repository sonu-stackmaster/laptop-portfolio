// Comprehensive Live Wallpapers Configuration & Metadata Registry (25+ Presets)

export const WALLPAPER_CATEGORIES = [
  { id: 'cosmic', name: 'Cosmic & Sci-Fi' },
  { id: 'cozy', name: 'Cozy & Atmospheric' },
  { id: 'macos', name: 'macOS & Fluid Dynamics' },
  { id: 'tech', name: 'Cyberpunk & Geometric' },
  { id: 'ambient', name: 'Minimalist & Ambient' }
];

export const WALLPAPER_PRESETS = [
  // --- 1. Cosmic & Sci-Fi ---
  {
    id: 'cyber-nebula',
    name: 'Cyber Nebula & Aurora',
    category: 'Cosmic & Sci-Fi',
    tag: 'Default',
    description: 'Ethereal cosmic nebulas with morphing luminous aura orbs and drifting stardust.',
    darkBadge: 'from-purple-600 via-indigo-600 to-pink-500',
    lightBadge: 'from-orange-400 via-amber-400 to-rose-400'
  },
  {
    id: 'starfield-warp',
    name: 'Cosmic Warp Speed',
    category: 'Cosmic & Sci-Fi',
    tag: 'Space',
    description: 'Deep cosmic starfield with high-velocity warp streaks and shooting meteors.',
    darkBadge: 'from-blue-700 via-purple-700 to-slate-900',
    lightBadge: 'from-indigo-400 via-sky-400 to-amber-300'
  },
  {
    id: 'black-hole',
    name: 'Singularity Black Hole',
    category: 'Cosmic & Sci-Fi',
    tag: 'Gravity',
    description: 'Swirling relativistic accretion disc warping starlight into a glowing event horizon.',
    darkBadge: 'from-amber-600 via-purple-900 to-black',
    lightBadge: 'from-orange-500 via-rose-400 to-amber-200'
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare Corona',
    category: 'Cosmic & Sci-Fi',
    tag: 'Stellar',
    description: 'Pulsing solar prominence with magnetic plasma loops and incandescent solar radiation.',
    darkBadge: 'from-amber-500 via-red-600 to-purple-900',
    lightBadge: 'from-amber-400 via-orange-400 to-rose-300'
  },
  {
    id: 'quantum-field',
    name: 'Quantum Collider',
    category: 'Cosmic & Sci-Fi',
    tag: 'Subatomic',
    description: 'Colliding subatomic energy waves with dancing quantum probability particles.',
    darkBadge: 'from-cyan-500 via-indigo-600 to-fuchsia-600',
    lightBadge: 'from-sky-400 via-teal-400 to-amber-300'
  },

  // --- 2. Cozy & Atmospheric ---
  {
    id: 'neon-rain',
    name: 'Neon Cyber Rain',
    category: 'Cozy & Atmospheric',
    tag: 'Rain',
    description: 'Gentle raindrops streaming down a futuristic neon-lit city window pane.',
    darkBadge: 'from-blue-600 via-cyan-500 to-indigo-900',
    lightBadge: 'from-sky-400 via-blue-300 to-amber-200'
  },
  {
    id: 'cozy-fireplace',
    name: 'Cozy Hearth Embers',
    category: 'Cozy & Atmospheric',
    tag: 'Warmth',
    description: 'Relaxing dancing warm fireplace embers and soothing ambient fire glow.',
    darkBadge: 'from-orange-600 via-amber-600 to-rose-950',
    lightBadge: 'from-amber-400 via-orange-400 to-yellow-200'
  },
  {
    id: 'cherry-blossom',
    name: 'Sakura Petal Breeze',
    category: 'Cozy & Atmospheric',
    tag: 'Zen',
    description: 'Delicate pink cherry blossom petals gently drifting on a serene spring wind.',
    darkBadge: 'from-pink-500 via-rose-600 to-purple-900',
    lightBadge: 'from-pink-300 via-rose-200 to-amber-100'
  },
  {
    id: 'snowfall',
    name: 'Silent Mountain Snow',
    category: 'Cozy & Atmospheric',
    tag: 'Winter',
    description: 'Peaceful snow flurry drifting over crisp alpine peaks with sparkling crystals.',
    darkBadge: 'from-indigo-900 via-slate-800 to-cyan-900',
    lightBadge: 'from-sky-200 via-blue-100 to-slate-200'
  },
  {
    id: 'autumn-breeze',
    name: 'Autumn Amber Wind',
    category: 'Cozy & Atmospheric',
    tag: 'Foliage',
    description: 'Golden autumn leaves swirling through warm sunbeams and crisp evening air.',
    darkBadge: 'from-amber-600 via-red-700 to-yellow-900',
    lightBadge: 'from-orange-300 via-amber-200 to-yellow-100'
  },
  {
    id: 'aurora-borealis',
    name: 'Nordic Aurora Lights',
    category: 'Cozy & Atmospheric',
    tag: 'Northern',
    description: 'Emerald and violet polar magnetic curtains waving across Arctic night skies.',
    darkBadge: 'from-emerald-500 via-teal-600 to-indigo-900',
    lightBadge: 'from-teal-300 via-emerald-200 to-sky-200'
  },

  // --- 3. macOS & Fluid Dynamics ---
  {
    id: 'sonoma-waves',
    name: 'macOS Sonoma Waves',
    category: 'macOS & Fluid Dynamics',
    tag: 'Apple OS',
    description: 'Harmonic undulating liquid waves with dynamic chromatic gradients and shimmer.',
    darkBadge: 'from-violet-600 via-fuchsia-600 to-purple-800',
    lightBadge: 'from-amber-400 via-orange-500 to-rose-500'
  },
  {
    id: 'monterey-glow',
    name: 'macOS Monterey Fluid',
    category: 'macOS & Fluid Dynamics',
    tag: 'Apple OS',
    description: 'Layered topographical fluid ribbons shifting through rich violet and magenta.',
    darkBadge: 'from-purple-700 via-pink-600 to-indigo-900',
    lightBadge: 'from-rose-400 via-purple-300 to-amber-200'
  },
  {
    id: 'ventura-bloom',
    name: 'macOS Ventura Petals',
    category: 'macOS & Fluid Dynamics',
    tag: 'Apple OS',
    description: 'Luminescent abstract floral bloom with kinetic amber and terracotta rays.',
    darkBadge: 'from-orange-600 via-amber-500 to-rose-900',
    lightBadge: 'from-amber-300 via-orange-300 to-yellow-200'
  },
  {
    id: 'liquid-mercury',
    name: 'Liquid Chrome Mercury',
    category: 'macOS & Fluid Dynamics',
    tag: 'Metallic',
    description: 'Reflective liquid metal waves rippling with glossy specular highlights.',
    darkBadge: 'from-slate-500 via-zinc-600 to-purple-950',
    lightBadge: 'from-slate-300 via-zinc-200 to-orange-100'
  },
  {
    id: 'bioluminescent-ocean',
    name: 'Deep Abyss Bioluminescence',
    category: 'macOS & Fluid Dynamics',
    tag: 'Oceanic',
    description: 'Glowing oceanic bioluminescent plankton drifting in serene deep blue waters.',
    darkBadge: 'from-cyan-600 via-blue-800 to-teal-950',
    lightBadge: 'from-cyan-300 via-sky-200 to-emerald-100'
  },

  // --- 4. Cyberpunk & Geometric ---
  {
    id: 'cyber-grid',
    name: 'Neural Matrix & Grid',
    category: 'Cyberpunk & Geometric',
    tag: 'Synthwave',
    description: 'Perspective 3D cybernetic wireframe grid with scanning laser beams and data nodes.',
    darkBadge: 'from-cyan-500 via-blue-600 to-indigo-600',
    lightBadge: 'from-amber-500 via-orange-500 to-red-500'
  },
  {
    id: 'digital-rain',
    name: 'Matrix Code Streams',
    category: 'Cyberpunk & Geometric',
    tag: 'Hacker',
    description: 'Cascading phosphorescent digital glyphs and encrypted mainframe code strings.',
    darkBadge: 'from-emerald-500 via-green-600 to-slate-950',
    lightBadge: 'from-emerald-400 via-teal-300 to-amber-200'
  },
  {
    id: 'hex-matrix',
    name: 'Hexagonal Honeycomb Core',
    category: 'Cyberpunk & Geometric',
    tag: 'High-Tech',
    description: 'Pulsing geometric honeycomb lattice transferring energy pulses along node pathways.',
    darkBadge: 'from-blue-600 via-purple-600 to-cyan-500',
    lightBadge: 'from-amber-400 via-orange-400 to-rose-300'
  },
  {
    id: 'geometric-shards',
    name: 'Iridescent Glass Shards',
    category: 'Cyberpunk & Geometric',
    tag: 'Prism',
    description: 'Floating faceted crystal prisms with interactive glass dispersion and refraction.',
    darkBadge: 'from-fuchsia-600 via-pink-600 to-purple-600',
    lightBadge: 'from-rose-400 via-amber-400 to-orange-400'
  },
  {
    id: 'isometric-skyline',
    name: 'Synthwave Neon Skyline',
    category: 'Cyberpunk & Geometric',
    tag: 'Retro 80s',
    description: 'Retro 1984 wireframe neon skyscraper skyline with glowing sunset grid.',
    darkBadge: 'from-pink-600 via-purple-700 to-cyan-800',
    lightBadge: 'from-rose-400 via-orange-300 to-sky-300'
  },

  // --- 5. Minimalist & Ambient ---
  {
    id: 'ambient-sunset',
    name: 'Zen Sunset Luminescence',
    category: 'Minimalist & Ambient',
    tag: 'Minimal',
    description: 'Organic breathing ambient light field inspired by dynamic studio lighting.',
    darkBadge: 'from-purple-900 via-rose-800 to-amber-700',
    lightBadge: 'from-amber-200 via-orange-300 to-rose-300'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour Radiance',
    category: 'Minimalist & Ambient',
    tag: 'Warm',
    description: 'Soft golden solar diffusion with warm amber light leaks and subtle dust bokeh.',
    darkBadge: 'from-amber-700 via-orange-800 to-yellow-900',
    lightBadge: 'from-amber-200 via-yellow-100 to-orange-200'
  },
  {
    id: 'pastel-clouds',
    name: 'Dreamy Pastel Clouds',
    category: 'Minimalist & Ambient',
    tag: 'Serene',
    description: 'Weightless clouds infused with pastel lilac, cotton candy pink, and soft peach.',
    darkBadge: 'from-purple-800 via-indigo-900 to-rose-900',
    lightBadge: 'from-pink-200 via-purple-100 to-orange-100'
  },
  {
    id: 'obsidian-minimal',
    name: 'Obsidian Velvet Minimal',
    category: 'Minimalist & Ambient',
    tag: 'Stealth',
    description: 'Ultra-clean deep obsidian velvet field with faint glowing horizon rim light.',
    darkBadge: 'from-slate-900 via-purple-950 to-black',
    lightBadge: 'from-slate-100 via-orange-50 to-white'
  }
];

export const DEFAULT_WALLPAPER = 'cyber-nebula';
