import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import MacBook3D from './MacBook3D';

export default function LaptopStage({ isDark, onToggleTheme, openApps, onOpenApp }) {
  return (
    <div className="relative w-full h-screen overflow-hidden select-none flex items-center justify-center">
      {/* Dynamic Ambient Background Backlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Core Radiating Ambient Glow centered behind laptop screen */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] sm:w-[950px] sm:h-[700px] rounded-full transition-all duration-700 animate-pulse-glow ${
            isDark 
              ? 'bg-purple-600/40 opacity-90 blur-[110px]' 
              : 'bg-orange-400/40 opacity-90 blur-[110px]'
          }`}
        />

        {/* Secondary Backlight Accent */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] rounded-full transition-all duration-700 ${
            isDark 
              ? 'bg-indigo-600/30 blur-[90px]' 
              : 'bg-amber-300/35 blur-[90px]'
          }`}
        />
      </div>

      {/* 3D Canvas Stage (Centering camera target directly at the midpoint of laptop screen & keyboard [0, 2.2, 0]) */}
      <Canvas className="w-full h-full relative z-10">
        <PerspectiveCamera makeDefault position={[0, 2.2, 13]} fov={38} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={isDark ? 0.7 : 1.2} />
        <directionalLight position={[5, 10, 7]} intensity={isDark ? 1.5 : 2.0} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.8 : 1.0} color={isDark ? "#8b5cf6" : "#f97316"} />
        <pointLight position={[0, 4, 4]} intensity={isDark ? 1.2 : 0.8} color="#ffffff" />

        {/* 3D MacBook Pro Model */}
        <MacBook3D
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          openApps={openApps}
          onOpenApp={onOpenApp}
        />

        {/* Orbit Controls (Center of rotation at midpoint [0, 2.2, 0]) */}
        <OrbitControls
          target={[0, 2.2, 0]}
          enableZoom={true}
          minDistance={6}
          maxDistance={15}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.05}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enablePan={false}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Helper Tip Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/70 border border-purple-500/30 text-[11px] font-mono text-purple-300 backdrop-blur-md">
          <span>🖱️ Drag mouse to orbit 3D MacBook • Click icons on screen to launch apps</span>
        </div>
      </div>
    </div>
  );
}
