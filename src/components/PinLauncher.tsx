import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PinLauncherProps {
  target: { x: number; y: number; id: number };
  onArrived: () => void;
}

/**
 * Animates a pin from the bottom-center of the viewport
 * toward the exact balloon that was clicked.
 */
export default function PinLauncher({ target, onArrived }: PinLauncherProps) {
  const [startPos] = useState(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight - 40,
  }));

  useEffect(() => {
    // Pin travel time
    const timer = setTimeout(onArrived, 450);
    return () => clearTimeout(timer);
  }, [onArrived]);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{ left: 0, top: 0, willChange: "transform, opacity" }}
      initial={{ x: startPos.x - 8, y: startPos.y }}
      animate={{ x: target.x - 8, y: target.y - 16 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like ease
      }}
    >
      {/* Pin SVG */}
      <svg
        width="16"
        height="32"
        viewBox="0 0 16 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Pin head */}
        <circle cx="8" cy="6" r="5.5" fill="#e53e5f" stroke="#c0294a" strokeWidth="1" />
        {/* Shine on pin head */}
        <circle cx="6.5" cy="4.5" r="1.5" fill="rgba(255,255,255,0.5)" />
        {/* Pin needle */}
        <line
          x1="8"
          y1="11.5"
          x2="8"
          y2="31"
          stroke="#888"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Needle tip */}
        <circle cx="8" cy="31" r="0.8" fill="#666" />
      </svg>

      {/* Sparkle trail */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1, 0.3] }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <span className="text-xs">✨</span>
      </motion.div>
    </motion.div>
  );
}
