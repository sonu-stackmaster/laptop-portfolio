import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import IPadOSDesktop from '../LaptopOS/IPadOSDesktop';

// Helper to create rounded rectangle shape for iPad Pro chassis
function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

export default function IPad3D({ isDark, onToggleTheme, openApps, onOpenApp, onCloseApp }) {
  const groupRef = useRef();

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.04;
    }
  });

  // Geometries for iPad Pro (7.2 x 5.0 in landscape orientation)
  const { chassisGeometry, frontBezelGeometry, backGlassGeometry } = useMemo(() => {
    const shape = createRoundedRectShape(7.2, 5.0, 0.45);

    const extrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04
    };

    const chassisGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    chassisGeo.center();

    const bezelGeo = new THREE.ShapeGeometry(createRoundedRectShape(7.14, 4.94, 0.42));
    const backGeo = new THREE.ShapeGeometry(createRoundedRectShape(7.14, 4.94, 0.42));

    return {
      chassisGeometry: chassisGeo,
      frontBezelGeometry: bezelGeo,
      backGlassGeometry: backGeo
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* Aluminum Unibody Chassis */}
      <mesh geometry={chassisGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={isDark ? '#1a102f' : '#e2ded5'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Front Glass Surface */}
      <mesh geometry={frontBezelGeometry} position={[0, 0, 0.15]}>
        <meshStandardMaterial
          color={isDark ? '#070310' : '#fcf9f5'}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Back Surface with Apple Emblem Accent */}
      <mesh geometry={backGlassGeometry} position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color={isDark ? '#120b24' : '#d8d4cb'}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Camera Module Island (Top Right back) */}
      <mesh position={[2.8, 1.8, -0.17]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color={isDark ? '#261746' : '#bfb9ad'} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Drei HTML Screen Projection */}
      <Html
        transform
        position={[0, 0, 0.16]}
        distanceFactor={4.5}
        className="pointer-events-auto select-none"
        style={{
          width: '620px',
          height: '410px',
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 0 35px rgba(168, 85, 247, 0.35)'
            : '0 0 30px rgba(249, 115, 22, 0.25)'
        }}
      >
        <IPadOSDesktop
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          openApps={openApps}
          onOpenApp={onOpenApp}
          onCloseApp={onCloseApp}
        />
      </Html>
    </group>
  );
}
