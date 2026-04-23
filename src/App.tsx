import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeaderCounter from "./components/HeaderCounter";
import BalloonGrid from "./components/BalloonGrid";
import PinLauncher from "./components/PinLauncher";
import RevealMessageCard from "./components/RevealMessageCard";
import FinalCelebration from "./components/FinalCelebration";
import FloatingHearts from "./components/FloatingHearts";
import PageIndicator from "./components/PageIndicator";
import {
  TOTAL_BALLOONS,
  TOTAL_PAGES,
  getBalloonsForPage,
  isPageComplete,
  isLastPage,
  GIANT_BALLOON_ID,
} from "./utils/pagination";
import { reasons } from "./data/reasons";

/** Coordinates for pin animation target */
interface BalloonTarget {
  x: number;
  y: number;
  id: number;
}

type AppPhase = "idle" | "pin-flying" | "popping" | "revealing" | "celebration";

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [poppedSet, setPoppedSet] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<AppPhase>("idle");
  const [pinTarget, setPinTarget] = useState<BalloonTarget | null>(null);
  const [revealedMessage, setRevealedMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [giantPopped, setGiantPopped] = useState(false);

  const poppedCount = poppedSet.size;

  const currentBalloons = useMemo(
    () => getBalloonsForPage(currentPage),
    [currentPage]
  );

  const onLastPage = isLastPage(currentPage);
  const lastPageNormalComplete =
    onLastPage && isPageComplete(currentPage, poppedSet);

  const stateRef = useRef({ phase, poppedSet, giantPopped, pinTarget });
  useEffect(() => {
    stateRef.current = { phase, poppedSet, giantPopped, pinTarget };
  });

  /** Called when a balloon is tapped/clicked */
  const handleBalloonClick = useCallback(
    (id: number, rect: DOMRect) => {
      const { phase, poppedSet } = stateRef.current;
      if (phase !== "idle" || poppedSet.has(id)) return;

      const target: BalloonTarget = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        id,
      };
      setPinTarget(target);
      setPhase("pin-flying");
    },
    []
  );

  /** Called when pin reaches the balloon */
  const handlePinArrived = useCallback(() => {
    const { pinTarget, poppedSet } = stateRef.current;
    if (!pinTarget) return;
    setPhase("popping");

    // After pop animation, reveal message
    setTimeout(() => {
      const newPopped = new Set(poppedSet);
      newPopped.add(pinTarget.id);
      setPoppedSet(newPopped);

      if (pinTarget.id === GIANT_BALLOON_ID) {
        // Giant balloon popped → celebration!
        setGiantPopped(true);
        setPhase("celebration");
        setShowCelebration(true);
        setPinTarget(null);
      } else {
        setRevealedMessage(reasons[pinTarget.id]);
        setPhase("revealing");
      }
    }, 500);
  }, []);

  /** Close the revealed message card */
  const handleCloseReveal = useCallback(() => {
    setRevealedMessage(null);
    setPinTarget(null);
    setPhase("idle");

    // Check if page is complete → auto-advance
    setTimeout(() => {
      setPoppedSet((prev) => {
        if (isPageComplete(currentPage, prev) && !isLastPage(currentPage)) {
          setTimeout(() => {
            setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES - 1));
          }, 400);
        }
        return prev;
      });
    }, 100);
  }, [currentPage]);

  /** Giant balloon click handler */
  const handleGiantClick = useCallback(
    (rect: DOMRect) => {
      const { phase, giantPopped } = stateRef.current;
      if (phase !== "idle" || giantPopped) return;
      const target: BalloonTarget = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        id: GIANT_BALLOON_ID,
      };
      setPinTarget(target);
      setPhase("pin-flying");
    },
    []
  );

  return (
    <div className="relative flex flex-col min-h-dvh">
      {/* Floating background decoration */}
      <FloatingHearts />

      {/* Header with counter */}
      <HeaderCounter popped={poppedCount} total={TOTAL_BALLOONS} />

      {/* Page indicator */}
      <PageIndicator current={currentPage} total={TOTAL_PAGES} />

      {/* Balloon Grid */}
      <main className="flex-1 relative z-10 px-3 pb-24 pt-2">
        <AnimatePresence mode="wait">
          <BalloonGrid
            key={currentPage}
            balloonIds={currentBalloons}
            poppedSet={poppedSet}
            poppingId={phase === "popping" ? pinTarget?.id ?? null : null}
            onBalloonClick={handleBalloonClick}
            showGiant={onLastPage && lastPageNormalComplete && !giantPopped}
            onGiantClick={handleGiantClick}
            giantPopping={
              phase === "popping" && pinTarget?.id === GIANT_BALLOON_ID
            }
          />
        </AnimatePresence>
      </main>

      {/* Pin launcher overlay */}
      <AnimatePresence>
        {phase === "pin-flying" && pinTarget && (
          <PinLauncher target={pinTarget} onArrived={handlePinArrived} />
        )}
      </AnimatePresence>

      {/* Revealed message modal */}
      <AnimatePresence>
        {phase === "revealing" && revealedMessage && (
          <RevealMessageCard
            message={revealedMessage}
            index={pinTarget?.id ?? 0}
            onClose={handleCloseReveal}
          />
        )}
      </AnimatePresence>

      {/* Final celebration */}
      <AnimatePresence>
        {showCelebration && <FinalCelebration />}
      </AnimatePresence>
    </div>
  );
}
