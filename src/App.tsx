import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer, SiGithub, SiVercel } from 'react-icons/si';
import { LogoLoop } from './components/LogoLoop';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Settings2, Wind, Maximize, Activity, Sparkles, MousePointer2, ArrowRightLeft, Download } from 'lucide-react';

const techLogos = [
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite className="text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiFramer className="text-black dark:text-white" />, title: "Framer Motion", href: "https://motion.dev" },
  { node: <SiGithub className="text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
  { node: <SiVercel className="text-black dark:text-white" />, title: "Vercel", href: "https://vercel.com" },
];

const BubbleItem = ({ 
  item, 
  index, 
  turbulence, 
  size, 
  discoMode, 
  popOnHover 
}: { 
  item: any; 
  index: number; 
  turbulence: number; 
  size: number; 
  discoMode: boolean; 
  popOnHover: boolean;
}) => {
  const [isPopped, setIsPopped] = useState(false);

  // Create a stable random delay and duration based on the item index
  const delay = useMemo(() => (index % 5) * 0.5, [index]);
  const duration = useMemo(() => 3 + (index % 3), [index]);
  
  // Dynamic movement based on turbulence
  const yOffset = useMemo(() => turbulence + (index % (Math.max(1, turbulence))), [index, turbulence]);
  const xOffset = useMemo(() => turbulence / 2, [turbulence]);

  const handlePop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isPopped) {
      setIsPopped(true);
      // Restore after 3 seconds
      setTimeout(() => {
        setIsPopped(false);
      }, 3000);
    }
  };

  const discoColor = useMemo(() => `hsl(${(index * 60) % 360}, 80%, 60%)`, [index]);

  return (
    <motion.div
      animate={isPopped ? { y: 0, x: 0 } : {
        y: [0, -yOffset, 0, yOffset, 0],
        x: [0, xOffset, 0, -xOffset, 0],
      }}
      transition={isPopped ? { duration: 0 } : {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      onClick={!popOnHover ? handlePop : undefined}
      onMouseEnter={popOnHover ? handlePop : undefined}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center cursor-pointer"
    >
      {/* Bubble Shell */}
      <motion.div
        animate={isPopped ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-500"
        style={{
          borderColor: discoMode ? discoColor : 'rgba(255,255,255,0.2)',
          boxShadow: discoMode ? `inset 0 0 20px ${discoColor}, 0 0 20px ${discoColor}` : '0 8px 32px 0 rgba(31,38,135,0.15)',
          backgroundColor: discoMode ? `${discoColor}22` : 'rgba(255,255,255,0.1)'
        }}
      >
        {/* Bubble reflection highlights to make it look like a soap bubble */}
        <div className="absolute top-[10%] left-[15%] w-[25%] h-[12%] rounded-[100%] bg-white/40 blur-[1px] transform -rotate-12" />
        <div className="absolute bottom-[12%] right-[15%] w-[12%] h-[12%] rounded-full bg-white/20 blur-[1px]" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.2)] pointer-events-none" />
      </motion.div>

      <motion.div 
        animate={isPopped ? { y: 300, rotate: 180, opacity: 0, scale: 0.5 } : { y: 0, rotate: 0, opacity: 1, scale: 1 }}
        transition={isPopped ? { duration: 0.6, ease: "easeIn" } : { duration: 0.3 }}
        className="z-10 drop-shadow-md flex items-center justify-center"
        style={{ fontSize: size * 0.4 }}
      >
        {item.node}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  // Control Panel State
  const [speed, setSpeed] = useState(40);
  const [reverseFlow, setReverseFlow] = useState(false);
  const [turbulence, setTurbulence] = useState(10);
  const [bubbleSize, setBubbleSize] = useState(96);
  const [density, setDensity] = useState(40);
  const [discoMode, setDiscoMode] = useState(false);
  const [popOnHover, setPopOnHover] = useState(false);

  const handleDownload = () => {
    const code = `import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer, SiGithub, SiVercel } from 'react-icons/si';
import { LogoLoop } from './components/LogoLoop';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

const techLogos = [
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite className="text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiFramer className="text-black dark:text-white" />, title: "Framer Motion", href: "https://motion.dev" },
  { node: <SiGithub className="text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
  { node: <SiVercel className="text-black dark:text-white" />, title: "Vercel", href: "https://vercel.com" },
];

const BubbleItem = ({ item, index }: { item: any; index: number; }) => {
  const [isPopped, setIsPopped] = useState(false);

  const delay = useMemo(() => (index % 5) * 0.5, [index]);
  const duration = useMemo(() => 3 + (index % 3), [index]);
  
  const turbulence = ${turbulence};
  const size = ${bubbleSize};
  const discoMode = ${discoMode};
  const popOnHover = ${popOnHover};

  const yOffset = useMemo(() => turbulence + (index % (Math.max(1, turbulence))), [index]);
  const xOffset = turbulence / 2;

  const handlePop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isPopped) {
      setIsPopped(true);
      setTimeout(() => setIsPopped(false), 3000);
    }
  };

  const discoColor = useMemo(() => \`hsl(\${(index * 60) % 360}, 80%, 60%)\`, [index]);

  return (
    <motion.div
      animate={isPopped ? { y: 0, x: 0 } : {
        y: [0, -yOffset, 0, yOffset, 0],
        x: [0, xOffset, 0, -xOffset, 0],
      }}
      transition={isPopped ? { duration: 0 } : {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      onClick={!popOnHover ? handlePop : undefined}
      onMouseEnter={popOnHover ? handlePop : undefined}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={isPopped ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-500"
        style={{
          borderColor: discoMode ? discoColor : 'rgba(255,255,255,0.2)',
          boxShadow: discoMode ? \`inset 0 0 20px \${discoColor}, 0 0 20px \${discoColor}\` : '0 8px 32px 0 rgba(31,38,135,0.15)',
          backgroundColor: discoMode ? \`\${discoColor}22\` : 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="absolute top-[10%] left-[15%] w-[25%] h-[12%] rounded-[100%] bg-white/40 blur-[1px] transform -rotate-12" />
        <div className="absolute bottom-[12%] right-[15%] w-[12%] h-[12%] rounded-full bg-white/20 blur-[1px]" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.2)] pointer-events-none" />
      </motion.div>

      <motion.div 
        animate={isPopped ? { y: 300, rotate: 180, opacity: 0, scale: 0.5 } : { y: 0, rotate: 0, opacity: 1, scale: 1 }}
        transition={isPopped ? { duration: 0.6, ease: "easeIn" } : { duration: 0.3 }}
        className="z-10 drop-shadow-md flex items-center justify-center"
        style={{ fontSize: size * 0.4 }}
      >
        {item.node}
      </motion.div>
    </motion.div>
  );
};

export default function FloatingBubbles() {
  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden bg-slate-900 py-12">
      <div className="w-full max-w-6xl relative flex items-center" style={{ height: ${bubbleSize * 1.5} }}>
        <LogoLoop
          logos={techLogos}
          speed={${speed}}
          direction="${reverseFlow ? 'right' : 'left'}"
          logoHeight={${bubbleSize}}
          gap={${density}}
          hoverSpeed={${speed / 4}}
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners in bubbles"
          renderItem={(item: any, key: string) => {
            const indexMatch = key.match(/\\d+$/);
            const index = indexMatch ? parseInt(indexMatch[0], 10) : 0;
            return (
              <a href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.title} className="block p-4">
                <BubbleItem item={item} index={index} />
              </a>
            );
          }}
        />
      </div>
      <div className="w-full max-w-6xl relative flex items-center mt-8" style={{ height: ${bubbleSize * 1.5} }}>
        <LogoLoop
          logos={[...techLogos].reverse()}
          speed={${speed * 1.25}}
          direction="${reverseFlow ? 'left' : 'right'}"
          logoHeight={${bubbleSize}}
          gap={${density * 1.5}}
          hoverSpeed={${speed / 3}}
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners in bubbles"
          renderItem={(item: any, key: string) => {
            const indexMatch = key.match(/\\d+$/);
            const index = indexMatch ? parseInt(indexMatch[0], 10) + 5 : 5;
            return (
              <a href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.title} className="block p-4">
                <BubbleItem item={item} index={index} />
              </a>
            );
          }}
        />
      </div>
    </div>
  );
}
`;

    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FloatingBubbles.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center overflow-hidden pb-48">
      
      <div className="text-center mb-16 z-10 mt-12">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Floating Bubbles
        </h1>
        <p className="text-indigo-200 text-lg max-w-md mx-auto">
          Customized LogoLoop with animated soap bubbles drifting across the screen.
        </p>
      </div>

      <div className="w-full max-w-6xl relative flex items-center" style={{ height: bubbleSize * 1.5 }}>
        <LogoLoop
          logos={techLogos}
          speed={speed}
          direction={reverseFlow ? "right" : "left"}
          logoHeight={bubbleSize}
          gap={density}
          hoverSpeed={speed / 4}
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners in bubbles"
          renderItem={(item: any, key: string) => {
            const indexMatch = key.match(/\d+$/);
            const index = indexMatch ? parseInt(indexMatch[0], 10) : 0;
            
            return (
              <a 
                href={item.href} 
                target="_blank" 
                rel="noreferrer noopener"
                aria-label={item.title}
                className="block p-4"
              >
                <BubbleItem 
                  item={item} 
                  index={index} 
                  turbulence={turbulence}
                  size={bubbleSize}
                  discoMode={discoMode}
                  popOnHover={popOnHover}
                />
              </a>
            );
          }}
        />
      </div>
      
      <div className="w-full max-w-6xl relative flex items-center mt-8" style={{ height: bubbleSize * 1.5 }}>
        <LogoLoop
          logos={[...techLogos].reverse()}
          speed={speed * 1.25}
          direction={reverseFlow ? "left" : "right"}
          logoHeight={bubbleSize}
          gap={density * 1.5}
          hoverSpeed={speed / 3}
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners in bubbles"
          renderItem={(item: any, key: string) => {
            const indexMatch = key.match(/\d+$/);
            const index = indexMatch ? parseInt(indexMatch[0], 10) + 5 : 5;
            
            return (
              <a 
                href={item.href} 
                target="_blank" 
                rel="noreferrer noopener"
                aria-label={item.title}
                className="block p-4"
              >
                <BubbleItem 
                  item={item} 
                  index={index} 
                  turbulence={turbulence}
                  size={bubbleSize}
                  discoMode={discoMode}
                  popOnHover={popOnHover}
                />
              </a>
            );
          }}
        />
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Control Panel */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Speed */}
            <div className="space-y-2">
              <label className="flex items-center text-white/90 text-sm font-medium">
                <Activity className="w-4 h-4 mr-2 text-indigo-300" /> Speed: {speed}
              </label>
              <input type="range" min="10" max="150" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-indigo-400" />
            </div>

            {/* Turbulence */}
            <div className="space-y-2">
              <label className="flex items-center text-white/90 text-sm font-medium">
                <Wind className="w-4 h-4 mr-2 text-indigo-300" /> Turbulence: {turbulence}
              </label>
              <input type="range" min="0" max="50" value={turbulence} onChange={(e) => setTurbulence(Number(e.target.value))} className="w-full accent-indigo-400" />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="flex items-center text-white/90 text-sm font-medium">
                <Maximize className="w-4 h-4 mr-2 text-indigo-300" /> Size: {bubbleSize}px
              </label>
              <input type="range" min="60" max="150" value={bubbleSize} onChange={(e) => setBubbleSize(Number(e.target.value))} className="w-full accent-indigo-400" />
            </div>

            {/* Density */}
            <div className="space-y-2">
              <label className="flex items-center text-white/90 text-sm font-medium">
                <Settings2 className="w-4 h-4 mr-2 text-indigo-300" /> Spacing: {density}px
              </label>
              <input type="range" min="10" max="100" value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-indigo-400" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-white/10">
            <button onClick={() => setReverseFlow(!reverseFlow)} className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${reverseFlow ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
              <ArrowRightLeft className="w-4 h-4 mr-2" /> Reverse Flow
            </button>
            <button onClick={() => setDiscoMode(!discoMode)} className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${discoMode ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
              <Sparkles className="w-4 h-4 mr-2" /> Disco Mode
            </button>
            <button onClick={() => setPopOnHover(!popOnHover)} className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${popOnHover ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
              <MousePointer2 className="w-4 h-4 mr-2" /> Pop on Hover
            </button>
            <button onClick={handleDownload} className="flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-600">
              <Download className="w-4 h-4 mr-2" /> Download Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
