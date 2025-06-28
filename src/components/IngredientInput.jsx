import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function IngredientInput({
                                            ingredientName,
                                            setIngredientName,
                                            ingredientAmount,
                                            setIngredientAmount,
                                            ingredientUnit,
                                            setIngredientUnit,
                                            handleAddIngredient,
                                            isComposing,
                                            setIsComposing,
                                        }) {
    const unitOptions = ["g", "kg", "ml", "l", "個", "本", "枚", "適量"];

    return (
        <div className="flex gap-3 mb-4 flex-nowrap items-center">
            <Input
                placeholder="食材名"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !isComposing) {
                        e.preventDefault();
                        handleAddIngredient();
                    }
                }}
                className="w-2/5 rounded-full h-12 text-base"
            />
            <Input
                placeholder="数量 (例: 200)"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
                className="w-1/5 rounded-full h-12 text-base"
            />
            <select
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
                className="w-1/5 rounded-full border-gray-300 text-gray-500 px-3 h-12 text-base cursor-pointer"
            >
                {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>
                        {unit}
                    </option>
                ))}
            </select>
            <Button
                className="rounded-full bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-md hover:scale-105 transition px-6 py-6 text-base cursor-pointer"
                onClick={handleAddIngredient}
            >
                ➕ 追加
            </Button>
        </div>
    );
}
