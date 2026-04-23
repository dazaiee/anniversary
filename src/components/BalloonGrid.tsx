import { motion } from "framer-motion";
import HeartBalloon from "./HeartBalloon";
import FinalGiantBalloon from "./FinalGiantBalloon";

interface BalloonGridProps {
  balloonIds: number[];
  poppedSet: Set<number>;
  poppingId: number | null;
  onBalloonClick: (id: number, rect: DOMRect) => void;
  showGiant: boolean;
  onGiantClick: (rect: DOMRect) => void;
  giantPopping: boolean;
  isLastPage?: boolean;
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

export default function BalloonGrid({
  balloonIds,
  poppedSet,
  poppingId,
  onBalloonClick,
  showGiant,
  onGiantClick,
  giantPopping,
  isLastPage = false,
}: BalloonGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`grid gap-1 sm:gap-4 max-w-[360px] sm:max-w-lg mx-auto w-full flex-1 min-h-0 px-1 sm:px-0 ${
        isLastPage ? "grid-cols-1 grid-rows-6 place-items-center" : "grid-cols-4 grid-rows-6 place-items-center"
      }`}
    >
      {balloonIds.map((id) => (
        <HeartBalloon
          key={id}
          id={id}
          isPopped={poppedSet.has(id)}
          isPopping={poppingId === id}
          onClick={onBalloonClick}
        />
      ))}

      {/* Giant balloon appears after all normal ones on last page are popped */}
      {showGiant && (
        <div className={`${isLastPage ? 'col-span-1' : 'col-span-4'} flex justify-center mt-4`}>
          <FinalGiantBalloon onClick={onGiantClick} isPopping={giantPopping} />
        </div>
      )}
    </motion.div>
  );
}
