import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import MobileOSDesktop from '../LaptopOS/MobileOSDesktop';

// Helper function to create a 2D rounded rectangle shape for Three.js extrusion
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

export default function IPhone3D({ isDark, onToggleTheme }) {
  const iphoneGroup = useRef();

  // Subtle floating & tilt motion
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (iphoneGroup.current) {
      iphoneGroup.current.rotation.y = Math.sin(t / 3) * 0.12;
      iphoneGroup.current.position.y = Math.sin(t / 2) * 0.05;
    }
  });

  // Rounded 3D iPhone Chassis Extrusion matching rounded screen corners
  const chassisGeometry = useMemo(() => {
    const shape = createRoundedRectShape(3.62, 7.82, 0.54);
    const extrudeSettings = {
      depth: 0.36,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      curveSegments: 16
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Back Camera Island geometry
  const cameraIslandGeometry = useMemo(() => {
    const shape = createRoundedRectShape(1.4, 1.4, 0.3);
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      curveSegments: 12
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Front Glass Bezel & Back Glass rounded geometries
  const frontBezelGeometry = useMemo(() => {
    const shape = createRoundedRectShape(3.62, 7.82, 0.54);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const backGlassGeometry = useMemo(() => {
    const shape = createRoundedRectShape(3.60, 7.80, 0.54);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const titaniumColor = isDark ? "#4b5563" : "#d4d4d8"; // Titanium Frame
  const backGlassColor = isDark ? "#18181b" : "#f4f4f5";
  const darkGlow = "#8b5cf6";
  const lightGlow = "#f97316";

  return (
    <group ref={iphoneGroup} position={[0, 0, 0]} rotation={[0.04, 0, 0]}>
      {/* 1. SMOOTH ROUNDED TITANIUM 3D CHASSIS (Front face sits at z = 0.26) */}
      <mesh geometry={chassisGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={titaniumColor} 
          roughness={0.18} 
          metalness={0.92} 
        />
      </mesh>

      {/* 2. BACK FROSTED GLASS PANEL (at z = -0.26) */}
      <mesh geometry={backGlassGeometry} position={[0, 0, -0.26]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial 
          color={backGlassColor} 
          roughness={0.3} 
          metalness={0.5} 
        />
      </mesh>

      {/* 3. TRIPLE CAMERA MODULE ON BACK */}
      <group position={[-0.9, 2.5, -0.26]}>
        <mesh geometry={cameraIslandGeometry} position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial color={titaniumColor} roughness={0.15} metalness={0.8} />
        </mesh>
        {[
          [-0.32, 0.32], [0.32, 0.32], [-0.32, -0.32]
        ].map((pos, idx) => (
          <group key={idx} position={[pos[0], pos[1], -0.09]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
              <meshStandardMaterial color="#090a0f" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh position={[0, 0, -0.05]}>
              <circleGeometry args={[0.18, 32]} />
              <meshBasicMaterial color="#020617" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 4. PROMINENT HARDWARE SIDE BUTTONS */}
      {/* Right Power/Lock Button */}
      <mesh position={[1.88, 1.0, 0]}>
        <boxGeometry args={[0.08, 0.75, 0.24]} />
        <meshStandardMaterial color={titaniumColor} roughness={0.15} metalness={0.92} />
      </mesh>

      {/* Left Action Button & Volume Buttons */}
      <mesh position={[-1.88, 2.1, 0]}>
        <boxGeometry args={[0.08, 0.32, 0.24]} />
        <meshStandardMaterial color={titaniumColor} roughness={0.15} metalness={0.92} />
      </mesh>
      <mesh position={[-1.88, 1.3, 0]}>
        <boxGeometry args={[0.08, 0.55, 0.24]} />
        <meshStandardMaterial color={titaniumColor} roughness={0.15} metalness={0.92} />
      </mesh>
      <mesh position={[-1.88, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.55, 0.24]} />
        <meshStandardMaterial color={titaniumColor} roughness={0.15} metalness={0.92} />
      </mesh>

      {/* Bottom USB-C Port & Speaker Holes */}
      <mesh position={[0, -3.96, 0]}>
        <boxGeometry args={[0.48, 0.06, 0.24]} />
        <meshStandardMaterial color="#090a0f" roughness={0.8} />
      </mesh>
      {[-0.9, -0.65, -0.4, 0.4, 0.65, 0.9].map((xPos, idx) => (
        <mesh key={idx} position={[xPos, -3.96, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
          <meshStandardMaterial color="#090a0f" roughness={0.9} />
        </mesh>
      ))}

      {/* 5. BLACK GLASS FRONT BEZEL FRAME (at z = 0.258) */}
      <mesh geometry={frontBezelGeometry} position={[0, 0, 0.258]}>
        <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.9} />
      </mesh>

      {/* 6. DREI HTML FRONT SCREEN DISPLAY */}
      <Html
        transform
        position={[0, 0, 0.26]}
        distanceFactor={4.25}
        style={{
          width: '280px',
          height: '620px',
          background: isDark ? '#0b0718' : '#fffaf3',
          borderRadius: '38px',
          overflow: 'hidden'
        }}
      >
        <MobileOSDesktop
          isDark={isDark}
          onToggleTheme={onToggleTheme}
        />
      </Html>

      {/* Ambient Lighting for 3D Phone */}
      <pointLight 
        position={[0, 0, -1.8]} 
        intensity={isDark ? 3.0 : 2.0} 
        color={isDark ? darkGlow : lightGlow} 
        distance={10} 
      />

      {/* Contact Shadow */}
      <ContactShadows
        position={[0, -4.1, 0]}
        opacity={0.8}
        scale={10}
        blur={2.0}
        far={4}
        color={isDark ? darkGlow : lightGlow}
      />
    </group>
  );
}
