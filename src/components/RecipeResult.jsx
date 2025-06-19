import { Button } from "@/components/button";
import { AnimatePresence, motion } from "motion/react";

export default function RecipeResult({
  showResult,
  recipeName,
  steps,
  handleReset,
}) {
  return (
    <AnimatePresence>
      {showResult && (
        <motion.div
          className="p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-500 mb-6">
            {recipeName} 🎯
          </h3>
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li
                key={index}
                className="bg-[#FAFAFA] rounded-xl p-4 shadow-sm border border-gray-100"
              >
                STEP {index + 1}: {step}
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Button
              onClick={handleReset}
              className="bg-orange-300 hover:bg-orange-400 text-white px-10 py-3 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              🔄 もう一度
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
