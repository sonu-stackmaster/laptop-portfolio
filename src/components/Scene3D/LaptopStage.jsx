import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import MacBook3D from './MacBook3D';
import IPhone3D from './iPhone3D';

export default function LaptopStage({ isDark, onToggleTheme, openApps, onOpenApp, isMobile }) {
  return (
    <div className="relative w-full h-screen overflow-hidden select-none flex items-center justify-center">
      {/* Dynamic Ambient Background Backlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Core Radiating Ambient Glow centered behind model */}
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

      {/* 3D Canvas Stage */}
      <Canvas className="w-full h-full relative z-10">
        <PerspectiveCamera 
          makeDefault 
          position={isMobile ? [0, 0, 9.5] : [0, 2.2, 13]} 
          fov={isMobile ? 42 : 38} 
        />
        
        {/* Lighting Setup */}
        <ambientLight intensity={isDark ? 0.8 : 1.2} />
        <directionalLight position={[5, 10, 7]} intensity={isDark ? 1.6 : 2.0} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.8 : 1.0} color={isDark ? "#8b5cf6" : "#f97316"} />
        <pointLight position={[0, 4, 4]} intensity={isDark ? 1.2 : 0.8} color="#ffffff" />

        {/* Render 3D Model: iPhone 15 Pro for Mobile, MacBook Pro for Desktop */}
        {isMobile ? (
          <IPhone3D
            isDark={isDark}
            onToggleTheme={onToggleTheme}
          />
        ) : (
          <MacBook3D
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            openApps={openApps}
            onOpenApp={onOpenApp}
          />
        )}

        {/* Orbit Controls */}
        <OrbitControls
          target={isMobile ? [0, 0, 0] : [0, 2.2, 0]}
          enableZoom={true}
          minDistance={isMobile ? 5 : 6}
          maxDistance={isMobile ? 14 : 15}
          minPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 4}
          maxPolarAngle={isMobile ? Math.PI / 1.9 : Math.PI / 2.05}
          minAzimuthAngle={isMobile ? -Math.PI / 4 : -Math.PI / 3}
          maxAzimuthAngle={isMobile ? Math.PI / 4 : Math.PI / 3}
          enablePan={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
