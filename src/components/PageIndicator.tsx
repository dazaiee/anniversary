import { motion } from "framer-motion";

interface PageIndicatorProps {
  current: number;
  total: number;
}

/**
 * Cute page progress indicator showing which page/set
 * of balloons the user is on.
 */
export default function PageIndicator({ current, total }: PageIndicatorProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="relative z-20 px-6 pb-2 max-w-md mx-auto w-full">
      {/* Progress bar container */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{
          background: "rgba(255, 214, 224, 0.4)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--color-heart-light), var(--color-heart))",
            boxShadow: "0 0 10px rgba(229, 62, 95, 0.3)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Page label */}
      <p
        className="text-center text-xs mt-1 font-medium"
        style={{ color: "var(--color-heart)", opacity: 0.6 }}
      >
        Page {current + 1} of {total}
      </p>
    </div>
  );
}
