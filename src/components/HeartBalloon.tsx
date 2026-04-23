import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface HeartBalloonProps {
  id: number;
  isPopped: boolean;
  isPopping: boolean;
  onClick: (id: number, rect: DOMRect) => void;
}

/** Generate a gentle unique float offset per balloon */
function useFloatParams(id: number) {
  return useMemo(() => {
    const seed = ((id * 2654435761) >>> 0) % 1000;
    return {
      floatY: 3 + (seed % 5),
      floatDuration: 2.5 + (seed % 15) / 10,
      delay: (seed % 10) / 10,
    };
  }, [id]);
}

/** Pop burst particles */
function PopParticles() {
  const particles = useMemo(() => {
    const colors = ["#e53e5f", "#ff7096", "#ffd6e0", "#ff4081", "#f8bbd0"];
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 360;
      const dist = 30 + Math.random() * 25;
      const px = Math.cos((angle * Math.PI) / 180) * dist;
      const py = Math.sin((angle * Math.PI) / 180) * dist;
      return { px, py, color: colors[i % colors.length], size: 5 + Math.random() * 5 };
    });
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="pop-particle"
          style={{
            "--px": `${p.px}px`,
            "--py": `${p.py}px`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            left: "50%",
            top: "50%",
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

function HeartBalloon({
  id,
  isPopped,
  isPopping,
  onClick,
}: HeartBalloonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { floatY, floatDuration, delay } = useFloatParams(id);

  const handleClick = () => {
    if (isPopped || isPopping || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    onClick(id, rect);
  };

  return (
    <motion.div variants={itemVariants} className="flex justify-center">
      <button
        ref={ref}
        onClick={handleClick}
        disabled={isPopped}
        aria-label={`Heart balloon ${id + 1}${isPopped ? " (popped)" : ""}`}
        className="relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 rounded-full disabled:cursor-default cursor-pointer"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {isPopping ? (
          /* Pop animation */
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <span className="text-6xl sm:text-7xl select-none">❤️</span>
            <PopParticles />
          </motion.div>
        ) : isPopped ? (
          /* Popped state — subtle checkmark */
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 214, 224, 0.5)",
              border: "1px dashed rgba(229, 62, 95, 0.3)",
            }}
          >
            <span className="text-2xl opacity-40">💗</span>
          </motion.div>
        ) : (
          /* Active balloon with floating animation */
          <motion.div
            animate={{
              y: [-floatY, floatY, -floatY],
            }}
            transition={{
              duration: floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
            style={{ willChange: "transform" }}
          >
            {/* Glow behind heart */}
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-30"
              style={{
                background: "var(--color-heart-light)",
                transform: "scale(1.4)",
              }}
            />
            {/* Heart emoji */}
            <span className="relative text-6xl sm:text-7xl select-none drop-shadow-md">
              ❤️
            </span>
            {/* String below heart */}
            <div
              className="absolute left-1/2 -bottom-3 w-px h-4"
              style={{
                background: "linear-gradient(to bottom, #d4a0a0, transparent)",
                transformOrigin: "top",
                animation: `sway 2s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                willChange: "transform",
              }}
            />
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}

import React from "react";
export default React.memo(HeartBalloon);
