import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import OSDesktop from '../LaptopOS/OSDesktop';
import { soundFx } from '../../utils/audio';

// Chiclet Keyboard with Physical Keystroke Depression & Dynamic Control Center Backlight
function MacBookKeyboard({ isDark, keyboardBrightness = 80 }) {
  const [activeKeyIdx, setActiveKeyIdx] = useState(null);
  const keyColor = "#11131b";
  const glowColor = isDark ? "#7c3aed" : "#ea580c";

  // Calculate dynamic emissive intensity based on Control Center slider (0 - 100)
  const brightnessMultiplier = keyboardBrightness / 100;
  const emissiveInt = (isDark ? 0.45 : 0.3) * brightnessMultiplier;
  const lightIntensity = (isDark ? 0.5 : 0.35) * brightnessMultiplier;

  // Listen to real physical user typing on physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      
      soundFx.playKeyClick();
      // Select random key index in rows to visually depress
      const randomIdx = Math.floor(Math.random() * 14);
      setActiveKeyIdx(randomIdx);
    };

    const handleKeyUp = () => {
      setActiveKeyIdx(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const rows = [
    // Row 0: Function Keys
    { y: 1.4, keys: Array(14).fill({ w: 0.54, h: 0.26 }) },
    // Row 1: Number Row
    { y: 1.0, keys: Array(14).fill({ w: 0.54, h: 0.38 }) },
    // Row 2: QWERTY
    { y: 0.52, keys: Array(14).fill({ w: 0.54, h: 0.38 }) },
    // Row 3: ASDF
    { y: 0.04, keys: Array(13).fill({ w: 0.58, h: 0.38 }) },
    // Row 4: ZXCV
    { y: -0.44, keys: Array(12).fill({ w: 0.64, h: 0.38 }) },
    // Row 5: Spacebar Row
    { 
      y: -0.92, 
      keys: [
        { w: 0.6, h: 0.38 }, { w: 0.6, h: 0.38 }, { w: 0.6, h: 0.38 },
        { w: 3.4, h: 0.38 }, // Spacebar
        { w: 0.6, h: 0.38 }, { w: 0.6, h: 0.38 }, { w: 0.6, h: 0.38 }
      ] 
    }
  ];

  return (
    <group position={[0, 0.21, 0.3]}>
      {/* 1. Recessed Keyboard Well Base Inset */}
      <mesh position={[0, -0.01, -0.21]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.85, 2.75]} />
        <meshStandardMaterial color="#08090c" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* 2. DYNAMIC NEON BACKLIGHT MAT (Controlled by Control Center) */}
      <mesh position={[0, 0.005, -0.21]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.7, 2.6]} />
        <meshStandardMaterial 
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={emissiveInt}
          roughness={0.3}
        />
      </mesh>

      {/* 3. Keys Layout with Interactive Physical Travel */}
      {rows.map((row, rIdx) => {
        let currentX = -4.1;
        return (
          <group key={rIdx}>
            {row.keys.map((key, kIdx) => {
              const posX = currentX + key.w / 2;
              currentX += key.w + 0.07;
              const isPressed = activeKeyIdx === kIdx;

              return (
                <mesh 
                  key={kIdx} 
                  position={[posX, isPressed ? 0.012 : 0.032, -row.y]}
                >
                  <boxGeometry args={[key.w, 0.05, key.h]} />
                  <meshStandardMaterial 
                    color={isPressed ? (isDark ? "#3b1e6e" : "#fdba74") : keyColor} 
                    roughness={0.3} 
                    metalness={0.7} 
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* 4. Soft Fill Light driven by brightness */}
      <pointLight 
        position={[0, 0.15, -0.21]} 
        intensity={lightIntensity} 
        color={glowColor} 
        distance={3.5} 
      />
    </group>
  );
}

export default function MacBook3D({ 
  isDark, 
  onToggleTheme, 
  openApps, 
  onOpenApp, 
  currentWallpaper, 
  onChangeWallpaper,
  screenBrightness = 100,
  keyboardBrightness = 80,
  onOpenSpotlight,
  onOpenControlCenter
}) {
  const macbookGroup = useRef();

  // Subtle float motion around origin
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (macbookGroup.current) {
      macbookGroup.current.rotation.y = Math.sin(t / 4) * 0.04;
      macbookGroup.current.position.y = Math.sin(t / 2) * 0.05;
    }
  });

  const chassisColor = "#1a1d24"; // Space Grey Aluminum
  const darkGlow = "#8b5cf6";
  const lightGlow = "#f97316";

  return (
    <group ref={macbookGroup} position={[0, 0, 0]} rotation={[0.06, 0, 0]}>
      
      {/* 1. LOWER BASE CHASSIS (MacBook Deck) */}
      <group position={[0, 0, 0]}>
        {/* Main Base Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[11.2, 0.4, 7.6]} />
          <meshStandardMaterial color={chassisColor} roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Front Lip Notch Cutout */}
        <mesh position={[0, 0.14, 3.78]}>
          <boxGeometry args={[1.8, 0.12, 0.08]} />
          <meshStandardMaterial color="#0a0b0e" roughness={0.6} />
        </mesh>

        {/* MacBook Glass Trackpad */}
        <mesh 
          position={[0, 0.21, 2.3]} 
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={() => soundFx.playKeyClick()}
        >
          <planeGeometry args={[3.8, 2.4]} />
          <meshStandardMaterial color="#161821" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Trackpad Border Highlight */}
        <lineSegments position={[0, 0.211, 2.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.8, 2.4)]} />
          <lineBasicMaterial color={isDark ? "#8b5cf6" : "#f97316"} opacity={0.3} transparent />
        </lineSegments>

        {/* Speaker Grills (Left & Right of Keyboard) */}
        {[-4.9, 4.9].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.21, 0.09]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.75, 2.8]} />
            <meshStandardMaterial color="#0d0e14" roughness={0.8} />
          </mesh>
        ))}

        {/* Keyboard Keys Array with Dynamic Backlight & Typing Listeners */}
        <MacBookKeyboard isDark={isDark} keyboardBrightness={keyboardBrightness} />

        {/* Bottom Rubber Feet */}
        {[
          [-5.0, -0.22, 3.2], [5.0, -0.22, 3.2],
          [-5.0, -0.22, -3.2], [5.0, -0.22, -3.2]
        ].map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
            <meshStandardMaterial color="#06070a" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* 2. HINGE BAR */}
      <mesh position={[0, 0.2, -3.75]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 10.0, 16]} />
        <meshStandardMaterial color="#0a0b0e" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 3. UPPER SCREEN LID (Angled open at ~100 degrees) */}
      <group position={[0, 0.2, -3.75]} rotation={[-0.24, 0, 0]}>
        {/* Lid Back Aluminum Cover */}
        <mesh position={[0, 3.4, 0]}>
          <boxGeometry args={[11.2, 6.8, 0.22]} />
          <meshStandardMaterial color={chassisColor} roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Apple Glowing Logo on Back */}
        <mesh position={[0, 3.4, -0.12]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.45, 32]} />
          <meshBasicMaterial color={isDark ? "#a855f7" : "#fb923c"} />
        </mesh>

        {/* Screen Bezel Frame */}
        <mesh position={[0, 3.4, 0.1]}>
          <planeGeometry args={[10.8, 6.4]} />
          <meshStandardMaterial color="#050608" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* 4. DREI HTML SCREEN DISPLAY */}
        <Html
          transform
          occlude
          position={[0, 3.4, 0.12]}
          distanceFactor={5.7}
          style={{
            width: '780px',
            height: '460px',
            background: '#000',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        >
          <OSDesktop
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            openApps={openApps}
            onOpenApp={onOpenApp}
            currentWallpaper={currentWallpaper}
            onChangeWallpaper={onChangeWallpaper}
            screenBrightness={screenBrightness}
            onOpenSpotlight={onOpenSpotlight}
            onOpenControlCenter={onOpenControlCenter}
          />
        </Html>

        {/* PROMINENT HIGH-VISIBILITY MACBOOK CAMERA NOTCH ASSEMBLY */}
        <group position={[0, 6.6, 0.21]}>
          {/* Camera Notch Cutout Block */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 0.24, 0.05]} />
            <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.95} />
          </mesh>

          {/* Chrome Metallic Camera Rim */}
          <mesh position={[0, 0, 0.03]}>
            <ringGeometry args={[0.07, 0.10, 32]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.1} metalness={1.0} />
          </mesh>

          {/* Glossy Dark Camera Lens */}
          <mesh position={[0, 0, 0.031]}>
            <circleGeometry args={[0.07, 32]} />
            <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
          </mesh>

          {/* Reflective Glint Dot */}
          <mesh position={[-0.02, 0.02, 0.032]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* Glowing Green Camera Active LED */}
          <mesh position={[0.26, 0, 0.031]}>
            <circleGeometry args={[0.03, 16]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          <pointLight position={[0.26, 0, 0.05]} intensity={0.4} color="#22c55e" distance={0.6} />
        </group>

        {/* Ambient Backlight Radiating from Behind the Screen */}
        <pointLight 
          position={[0, 3.4, -1.5]} 
          intensity={isDark ? 3.5 : 2.5} 
          color={isDark ? darkGlow : lightGlow} 
          distance={12} 
        />
      </group>

      {/* Floor Contact Shadows */}
      <ContactShadows
        position={[0, -0.22, 0]}
        opacity={0.7}
        scale={16}
        blur={2.5}
        far={4}
        color={isDark ? darkGlow : lightGlow}
      />
    </group>
  );
}
