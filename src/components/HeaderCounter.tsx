import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface HeaderCounterProps {
  popped: number;
  total: number;
}

export default function HeaderCounter({ popped, total }: HeaderCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, popped, {
      duration: 0.6,
      ease: "easeOut",
    });
    return controls.stop;
  }, [popped, count]);

  return (
    <header className="relative z-20 pt-6 pb-2 text-center">
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-1"
        style={{ fontFamily: "var(--font-display)" , color: "var(--color-heart)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        365 Reasons Why I Love You
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-sm sm:text-base opacity-70 mb-3"
        style={{ fontFamily: "var(--font-body)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Tap each heart to discover a reason 💕
      </motion.p>

      {/* Counter pill */}
      <motion.div
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(229, 62, 95, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
          border: "1px solid rgba(255, 214, 224, 0.6)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
      >
        <span className="text-lg" role="img" aria-label="heart">
          💖
        </span>
        <span
          className="text-base sm:text-lg font-semibold"
          style={{ color: "var(--color-heart-deep)" }}
        >
          <motion.span>{rounded}</motion.span>
          <span className="opacity-50 mx-1">/</span>
          <span>{total}</span>
        </span>
        <span className="text-xs sm:text-sm opacity-60">Hearts Popped</span>
      </motion.div>
    </header>
  );
}
