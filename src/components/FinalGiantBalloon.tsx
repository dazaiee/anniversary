import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface FinalGiantBalloonProps {
  onClick: (rect: DOMRect) => void;
  isPopping: boolean;
}

function GiantPopParticles() {
  const particles = useMemo(() => {
    const colors = ["#e53e5f", "#ff7096", "#ffd6e0", "#ff4081", "#f8bbd0", "#ffab91", "#f48fb1"];
    return Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 360;
      const dist = 50 + Math.random() * 40;
      const px = Math.cos((angle * Math.PI) / 180) * dist;
      const py = Math.sin((angle * Math.PI) / 180) * dist;
      return { px, py, color: colors[i % colors.length], size: 8 + Math.random() * 8 };
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

export default function FinalGiantBalloon({ onClick, isPopping }: FinalGiantBalloonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!ref.current || isPopping) return;
    onClick(ref.current.getBoundingClientRect());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
    >
      <button
        ref={ref}
        onClick={handleClick}
        disabled={isPopping}
        aria-label="Final giant heart balloon — tap to reveal the anniversary surprise!"
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-4 rounded-full cursor-pointer disabled:cursor-default"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {isPopping ? (
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.5, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <span className="text-8xl sm:text-9xl select-none">❤️</span>
            <GiantPopParticles />
          </motion.div>
        ) : (
          <motion.div
            className="relative"
            animate={{
              y: [-8, 8, -8],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Big glow */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-40"
              style={{
                background: "radial-gradient(circle, var(--color-heart-light), transparent)",
                transform: "scale(2)",
              }}
            />

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid var(--color-heart-light)",
                transform: "scale(1.3)",
              }}
              animate={{
                scale: [1.3, 1.6, 1.3],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* The giant heart */}
            <span className="relative text-8xl sm:text-9xl select-none drop-shadow-lg">
              ❤️
            </span>

            {/* Label */}
            <motion.p
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold"
              style={{
                color: "var(--color-heart)",
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap me ✨
            </motion.p>

            {/* Sparkles around */}
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute text-lg"
                style={{
                  top: `${15 + i * 20}%`,
                  left: i % 2 === 0 ? "-15%" : "95%",
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                ✨
              </motion.span>
            ))}

            {/* String */}
            <div
              className="absolute left-1/2 -bottom-2 w-px h-8"
              style={{
                background: "linear-gradient(to bottom, #d4a0a0, transparent)",
                transformOrigin: "top",
                animation: "sway 2.5s ease-in-out infinite",
              }}
            />
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}
