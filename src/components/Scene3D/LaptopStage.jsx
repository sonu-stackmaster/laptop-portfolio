import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import MacBook3D from './MacBook3D';
import IPhone3D from './iPhone3D';
import IPad3D from './iPad3D';

// Free OrbitControls allowing zoom in/out and 360-degree inspection without snapping/auto-fixing
function FreeOrbitControls({ isMobile, isTablet }) {
  const controlsRef = useRef();

  return (
    <OrbitControls
      ref={controlsRef}
      target={isMobile ? [0, 0, 0] : isTablet ? [0, 0.5, 0] : [0, 2.2, 0]}
      enableZoom={true}
      minDistance={isMobile ? 5 : isTablet ? 6 : 6}
      maxDistance={isMobile ? 14 : isTablet ? 15 : 15}
      minPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 4}
      maxPolarAngle={isMobile ? Math.PI / 1.9 : Math.PI / 2.05}
      minAzimuthAngle={isMobile ? -Math.PI / 4 : -Math.PI / 4}
      maxAzimuthAngle={isMobile ? Math.PI / 4 : Math.PI / 4}
      enablePan={false}
      rotateSpeed={0.6}
    />
  );
}

export default function LaptopStage({ 
  isDark, 
  onToggleTheme, 
  openApps, 
  onOpenApp, 
  onCloseApp, 
  isMobile, 
  isTablet, 
  isDesktop, 
  currentWallpaper, 
  onChangeWallpaper,
  screenBrightness = 100,
  keyboardBrightness = 80,
  onOpenSpotlight,
  onOpenControlCenter
}) {
  const cameraPos = isMobile ? [0, 0, 9.5] : isTablet ? [0, 0.5, 11] : [0, 2.2, 13];
  const cameraFov = isMobile ? 42 : isTablet ? 40 : 38;

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
          position={cameraPos} 
          fov={cameraFov} 
        />
        
        {/* Lighting Setup */}
        <ambientLight intensity={isDark ? 0.8 : 1.2} />
        <directionalLight position={[5, 10, 7]} intensity={isDark ? 1.6 : 2.0} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.8 : 1.0} color={isDark ? "#8b5cf6" : "#f97316"} />
        <pointLight position={[0, 4, 4]} intensity={isDark ? 1.2 : 0.8} color="#ffffff" />

        {/* Render 3D Device Model */}
        {isMobile ? (
          <IPhone3D
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            currentWallpaper={currentWallpaper}
            onChangeWallpaper={onChangeWallpaper}
            screenBrightness={screenBrightness}
            onOpenSpotlight={onOpenSpotlight}
            onOpenControlCenter={onOpenControlCenter}
          />
        ) : isTablet ? (
          <IPad3D
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            openApps={openApps}
            onOpenApp={onOpenApp}
            onCloseApp={onCloseApp}
            currentWallpaper={currentWallpaper}
            onChangeWallpaper={onChangeWallpaper}
            screenBrightness={screenBrightness}
            onOpenSpotlight={onOpenSpotlight}
            onOpenControlCenter={onOpenControlCenter}
          />
        ) : (
          <MacBook3D
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            openApps={openApps}
            onOpenApp={onOpenApp}
            currentWallpaper={currentWallpaper}
            onChangeWallpaper={onChangeWallpaper}
            screenBrightness={screenBrightness}
            keyboardBrightness={keyboardBrightness}
            onOpenSpotlight={onOpenSpotlight}
            onOpenControlCenter={onOpenControlCenter}
          />
        )}

        {/* Natural 3D Orbit Controls without auto-fixing */}
        <FreeOrbitControls
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </Canvas>
    </div>
  );
}
