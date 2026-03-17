import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, useTexture, Float } from '@react-three/drei';
import { Suspense, useMemo, cloneElement, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { easing } from 'maath';
import * as THREE from 'three';

const LogoPlane = ({ svgString, isPopped }: { svgString: string, isPopped: boolean }) => {
  const svgUri = useMemo(() => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`, [svgString]);
  const texture = useTexture(svgUri);
  
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    if (!ref.current || !materialRef.current) return;
    
    // Animate position Y
    easing.damp(ref.current.position, 'y', isPopped ? -5 : 0, 0.2, delta);
    // Animate rotation Z
    easing.damp(ref.current.rotation, 'z', isPopped ? Math.PI : 0, 0.2, delta);
    // Animate scale
    const targetScale = isPopped ? 0.5 : 1;
    easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.2, delta);
    // Animate opacity
    easing.damp(materialRef.current, 'opacity', isPopped ? 0 : 1, 0.1, delta);
  });

  return (
    <mesh ref={ref} position={[0, 0, -0.5]}>
      <planeGeometry args={[1.8, 1.8]} />
      <meshBasicMaterial ref={materialRef} map={texture} transparent />
    </mesh>
  );
};

const BubbleSphere = ({ isPopped }: { isPopped: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!ref.current || !materialRef.current) return;
    
    const targetScale = isPopped ? 1.5 : 1;
    easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.1, delta);
    easing.damp(materialRef.current, 'opacity', isPopped ? 0 : 1, 0.1, delta);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <MeshTransmissionMaterial
        ref={materialRef}
        ior={1.15}
        thickness={2}
        transmission={1}
        roughness={0}
        chromaticAberration={0.05}
        anisotropy={0.01}
        transparent
      />
    </mesh>
  );
};

export const GlassBubble = ({ iconNode, isPopped }: { iconNode: any, isPopped: boolean }) => {
  const svgString = useMemo(() => {
    const styledIcon = cloneElement(iconNode, { size: 128 });
    let str = renderToStaticMarkup(styledIcon);
    if (!str.includes('xmlns=')) {
      str = str.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    return str;
  }, [iconNode]);

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0}>
            <LogoPlane svgString={svgString} isPopped={isPopped} />
            <BubbleSphere isPopped={isPopped} />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};
