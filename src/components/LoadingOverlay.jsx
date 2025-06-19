import { AnimatePresence, motion } from "motion/react";

export default function LoadingOverlay({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.7)] rounded-3xl z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="w-24 h-24 rounded-full border-8 border-t-8 border-t-[#FF8855] border-[#FFDACC] animate-spin"></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
