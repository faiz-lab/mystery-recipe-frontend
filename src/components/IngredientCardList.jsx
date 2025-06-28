import { motion, AnimatePresence } from "motion/react";

export default function IngredientCardList({ ingredients, onRemove }) {
    return (
        <div className="flex flex-wrap gap-3">
            <AnimatePresence>
                {ingredients.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center bg-orange-50 text-orange-700 rounded-full px-4 py-2 shadow-sm border border-orange-200"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {item.displayName} ({item.quantity}{item.unit})
                        <button
                            onClick={() => onRemove(index)}
                            className="ml-3 text-sm text-red-400 hover:text-red-600 cursor-pointer"
                        >
                            ❌
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
