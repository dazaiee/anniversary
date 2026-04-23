import { motion } from "framer-motion";

interface PageIndicatorProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Cute page progress indicator showing which page/set
 * of balloons the user is on, with navigation controls.
 */
export default function PageIndicator({ current, total, onPrev, onNext }: PageIndicatorProps) {
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

      {/* Page label with navigation */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="p-1 rounded-full hover:bg-pink-100/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <p
          className="text-xs font-medium min-w-[80px] text-center"
          style={{ color: "var(--color-heart)", opacity: 0.6 }}
        >
          Page {current + 1} of {total}
        </p>

        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="p-1 rounded-full hover:bg-pink-100/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
