import { motion } from "framer-motion";

interface RevealMessageCardProps {
  message: string;
  index: number;
  onClose: () => void;
}

/**
 * A bottom-sheet style card that reveals the romantic reason
 * after a heart balloon is popped. Optimized for mobile readability.
 */
export default function RevealMessageCard({
  message,
  index,
  onClose,
}: RevealMessageCardProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-sm mx-3 mb-4 sm:mb-0 rounded-3xl p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,228,235,0.9) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(229, 62, 95, 0.2), 0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(255, 214, 224, 0.5)",
        }}
        initial={{ y: 100, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Decorative hearts */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <motion.span
            className="text-3xl"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
          >
            💝
          </motion.span>
        </div>

        {/* Reason number */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-3 mt-2"
          style={{ color: "var(--color-heart)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.15 }}
        >
          Reason #{index + 1}
        </motion.p>

        {/* Message */}
        <motion.p
          className="text-center text-lg sm:text-xl leading-relaxed font-medium"
          style={{
            fontFamily: "var(--font-body)",
            color: "#4a2040",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          "{message}"
        </motion.p>

        {/* Close hint */}
        <motion.button
          onClick={onClose}
          className="mt-5 mx-auto block px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          style={{
            background: "linear-gradient(135deg, var(--color-heart) 0%, var(--color-heart-deep) 100%)",
            color: "white",
            boxShadow: "0 4px 15px rgba(229, 62, 95, 0.35)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Next Heart 💕
        </motion.button>

        {/* Corner sparkle accents */}
        <motion.span
          className="absolute top-3 right-4 text-sm opacity-50"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.span>
        <motion.span
          className="absolute bottom-3 left-4 text-sm opacity-40"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          ✨
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
