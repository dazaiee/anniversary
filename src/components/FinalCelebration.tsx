import { useMemo } from "react";
import { motion } from "framer-motion";

/** Generates confetti + floating hearts for the grand finale */
function Confetti() {
  const pieces = useMemo(() => {
    const colors = [
      "#e53e5f", "#ff7096", "#ffd6e0", "#ff4081", "#f8bbd0",
      "#ffab91", "#ce93d8", "#80deea", "#fff176", "#a5d6a7",
    ];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }));
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: p.size,
            height: p.shape === "rect" ? p.size * 1.5 : p.size,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
}

/** Floating hearts that rise up */
function FloatingCelebrationHearts() {
  const hearts = useMemo(() => {
    const emojis = ["💕", "💖", "💗", "💝", "💘", "❤️", "🩷", "💞"];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: 5 + Math.random() * 90,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 1.2 + Math.random() * 1.2,
    }));
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed pointer-events-none z-[101]"
          style={{
            left: `${h.left}%`,
            bottom: "-5%",
            fontSize: `${h.size}rem`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </>
  );
}

/**
 * Full-screen celebration overlay for the final anniversary reveal.
 */
export default function FinalCelebration() {
  return (
    <motion.div
      className="fixed inset-0 z-[99] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Confetti */}
      <Confetti />

      {/* Floating hearts */}
      <FloatingCelebrationHearts />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,182,193,0.6) 0%, rgba(224,247,250,0.8) 50%, rgba(243,229,245,0.85) 100%)",
          backdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Message container */}
      <motion.div
        className="relative z-[102] text-center px-6 max-w-lg"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Big heart decoration */}
        <motion.div
          className="text-6xl sm:text-7xl mb-4"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💖
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-heart)",
            textShadow: "0 2px 20px rgba(229, 62, 95, 0.3)",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          Happiest Anniversary, My Angel
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-medium mb-6"
          style={{
            fontFamily: "var(--font-body)",
            color: "#7c4a6b",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Our first anniversary together 💕
        </motion.p>

        {/* Heartfelt closing */}
        <motion.div
          className="text-base sm:text-lg leading-relaxed max-w-md mx-auto flex flex-col gap-2"
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a5a7a",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <p>365 days, 365 reasons, and still not enough words to describe how much you mean to me, Khushi.</p>
          <p>Thank you for choosing me.</p>
          <p>Thank you for making my life so beautiful.</p>
          <p>I want to live forever with you, my love. 🤍</p>
          <p className="mt-2 font-medium text-pink-500">Here is a song for you.</p>
        </motion.div>

        {/* Spotify Embed */}
        <motion.div
          className="mt-6 mx-auto w-full max-w-[300px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <iframe 
            style={{ borderRadius: "12px" }} 
            src="https://open.spotify.com/embed/track/3ihRHbHv7rxX9YFd4FFFBb?utm_source=generator" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen={false} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="mt-6 mx-auto h-px w-32"
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-heart-light), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        />

        {/* Final sparkle */}
        <motion.div
          className="mt-4 text-2xl pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 2.6, duration: 2, repeat: Infinity }}
        >
          ✨ 💕 ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
