import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import OSDesktop from '../LaptopOS/OSDesktop';

// Chiclet Keyboard Generator for realistic MacBook Pro keyboard
function MacBookKeyboard({ isDark }) {
  const keyColor = "#12141c";
  const glowColor = isDark ? "#8b5cf6" : "#f97316";

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
      {/* Recessed Keyboard Well Inset */}
      <mesh position={[0, -0.01, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.0, 3.2]} />
        <meshStandardMaterial color="#0a0b0f" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Keys Layout */}
      {rows.map((row, rIdx) => {
        let currentX = -4.1;
        return (
          <group key={rIdx}>
            {row.keys.map((key, kIdx) => {
              const posX = currentX + key.w / 2;
              currentX += key.w + 0.07;

              return (
                <mesh key={kIdx} position={[posX, 0.03, -row.y]}>
                  <boxGeometry args={[key.w, 0.05, key.h]} />
                  <meshStandardMaterial color={keyColor} roughness={0.3} metalness={0.8} />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Backlit Glow beneath keycaps */}
      <pointLight position={[0, 0.05, 0.2]} intensity={isDark ? 0.9 : 0.5} color={glowColor} distance={4} />
    </group>
  );
}

export default function MacBook3D({ isDark, onToggleTheme, openApps, onOpenApp }) {
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
        <mesh position={[0, 0.21, 2.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 2.4]} />
          <meshStandardMaterial color="#161821" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Trackpad Border Highlight */}
        <lineSegments position={[0, 0.211, 2.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.8, 2.4)]} />
          <lineBasicMaterial color={isDark ? "#8b5cf6" : "#f97316"} opacity={0.35} transparent />
        </lineSegments>

        {/* Speaker Grills (Left & Right of Keyboard) */}
        {[-4.9, 4.9].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.21, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.75, 3.1]} />
            <meshStandardMaterial color="#0d0e14" roughness={0.8} />
          </mesh>
        ))}

        {/* Keyboard Keys Array */}
        <MacBookKeyboard isDark={isDark} />

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

        {/* Webcam Lens Dot */}
        <mesh position={[0, 6.5, 0.11]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* 4. DREI HTML SCREEN DISPLAY (Proportionally scaled to fit screen bezel perfectly) */}
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
          />
        </Html>

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
