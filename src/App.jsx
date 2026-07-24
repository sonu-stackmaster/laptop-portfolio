import React, { useState, useEffect } from 'react';
import LaptopStage from './components/Scene3D/LaptopStage';
import FloatingCardsManager from './components/OuterCards/FloatingCardsManager';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [openApps, setOpenApps] = useState([]);

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
      {/* Central 3D Laptop Stage */}
      <LaptopStage
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        openApps={openApps}
        onOpenApp={handleOpenApp}
      />

      {/* Dynamic Floating Glass Cards around Laptop (Left, Top, Right) */}
      <FloatingCardsManager
        openApps={openApps}
        onCloseApp={handleCloseApp}
        isDark={isDark}
      />
    </main>
  );
}
