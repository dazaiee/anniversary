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
}: BalloonGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-4 gap-2 sm:gap-4 max-w-[360px] sm:max-w-lg mx-auto w-full px-2 sm:px-0"
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
        <div className="col-span-4 flex justify-center mt-4">
          <FinalGiantBalloon onClick={onGiantClick} isPopping={giantPopping} />
        </div>
      )}
    </motion.div>
  );
}
