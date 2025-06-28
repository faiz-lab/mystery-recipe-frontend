import { AnimatePresence, motion } from "motion/react";

export default function LoadingOverlay({ isLoading, isAdding }) {
  return (
      <>
        {/* 🍳 全屏 loading 遮罩 */}
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

        {/* ➕ 追加按钮 loading（右上角小圈圈） */}
        <AnimatePresence>
          {isAdding && (
              <motion.div
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.7)] rounded-3xl z-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="w-12 h-12 border-4 border-t-4 border-t-[#FF8855] border-[#FFDACC] rounded-full animate-spin" />
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}
