import React, { useState, useEffect } from 'react';
import LaptopStage from './components/Scene3D/LaptopStage';
import FloatingCardsManager from './components/OuterCards/FloatingCardsManager';
import { DEFAULT_WALLPAPER } from './components/Wallpapers/wallpaperConfig';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [openApps, setOpenApps] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentWallpaper, setCurrentWallpaper] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sonu_os_wallpaper');
      return saved || DEFAULT_WALLPAPER;
    }
    return DEFAULT_WALLPAPER;
  });

  const handleChangeWallpaper = (wallpaperId) => {
    setCurrentWallpaper(wallpaperId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sonu_os_wallpaper', wallpaperId);
    }
  };

  // Window resize handler for device breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const isDesktop = viewportWidth >= 1024;

  // Sync document root class for Tailwind Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenApp = (appId) => {
    setOpenApps((prev) => {
      if (prev.includes(appId)) return prev;
      return [...prev, appId];
    });
  };

  const handleCloseApp = (appId) => {
    setOpenApps((prev) => prev.filter((id) => id !== appId));
  };

  return (
    <main className={`min-h-screen w-full relative transition-colors duration-700 font-sans ${
      isDark ? 'bg-[#090514] text-slate-100' : 'bg-[#faf5ef] text-slate-900'
    }`}>
      {/* Central 3D Stage (iPhone for Mobile, iPad Pro for Tablet, MacBook Pro for Desktop) */}
      <LaptopStage
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        openApps={openApps}
        onOpenApp={handleOpenApp}
        onCloseApp={handleCloseApp}
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
        currentWallpaper={currentWallpaper}
        onChangeWallpaper={handleChangeWallpaper}
      />

      {/* Floating Outer Glass Cards (Desktop only) */}
      {isDesktop && (
        <FloatingCardsManager
          openApps={openApps}
          onCloseApp={handleCloseApp}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          currentWallpaper={currentWallpaper}
          onChangeWallpaper={handleChangeWallpaper}
        />
      )}
    </main>
  );
}
