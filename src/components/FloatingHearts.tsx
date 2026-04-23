import { useMemo } from "react";

/**
 * Ambient floating heart emojis in the background.
 * Uses pure CSS animation for performance (no Framer Motion overhead
 * on dozens of background elements).
 */
export default function FloatingHearts() {
  const hearts = useMemo(() => {
    const emojis = ["💗", "💕", "🩷", "💖", "♥"];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      size: 0.8 + Math.random() * 1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="bg-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
