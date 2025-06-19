import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";

const ingredientOptions = [
  "ニンジン",
  "じゃがいも",
  "玉ねぎ",
  "キャベツ",
  "ブロッコリー",
  "トマト",
  "卵",
  "牛乳",
  "鶏肉",
  "豚肉",
  "魚",
  "米",
  "パン",
  "パスタ",
];

const unitOptions = ["g", "kg", "ml", "l", "個", "本", "枚", "適量"];

export default function App() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("適量");
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [mustHaveList, setMustHaveList] = useState([]);
  const [avoidList, setAvoidList] = useState([]);
  const [cookingType, setCookingType] = useState("指定なし");
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleAddIngredient = () => {
    if (ingredientName.trim() !== "") {
      setAvailableIngredients((prev) => [
        ...prev,
        {
          name: ingredientName,
          amount: ingredientAmount || "適量",
          unit: ingredientAmount ? ingredientUnit : "",
        },
      ]);
      setIngredientName("");
      setIngredientAmount("");
      setIngredientUnit("適量");
    }
  };

  const handleStartCooking = async () => {
    setIsLoading(true);
    setShowResult(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/recipe`,
        {
          available_ingredients: availableIngredients,
          must_have: mustHaveList,
          avoid: avoidList,
          cooking_type: cookingType,
        }
      );
      setRecipeName(res.data.name);
      setSteps(res.data.steps);
      setIsLoading(false);
      setShowResult(true);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setRecipeName("");
    setSteps([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-[#F7F7F7] flex justify-center items-center py-16 px-4">
      <div className="max-w-3xl w-full space-y-12 relative">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-[#FF8855] mb-3 tracking-tight drop-shadow">
            ミステリーレシピ
          </h1>
          <p className="text-[#777] text-lg">
            冷蔵庫の食材＋今日の気分から最適レシピを提案！
          </p>
        </header>

        <section className="bg-white rounded-3xl p-8 space-y-6 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl font-semibold text-gray-700">
            持っている食材
          </h2>
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
              className="rounded-full bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-md hover:scale-105 transition px-6 py-6 text-base"
              onClick={handleAddIngredient}
            >
              ➕ 追加
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {availableIngredients.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-orange-50 text-orange-700 rounded-full px-4 py-2 shadow-sm border border-orange-200"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.name} ({item.amount}
                  {item.unit})
                  <button
                    onClick={() =>
                      setAvailableIngredients(
                        availableIngredients.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-3 text-sm text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    ❌
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">今日の気分</h2>
          <div>
            <p className="font-medium mb-1">必ず使いたい食材</p>
            <div className="flex flex-wrap gap-2">
              {ingredientOptions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (mustHaveList.includes(item)) {
                      setMustHaveList(mustHaveList.filter((v) => v !== item));
                    } else {
                      setMustHaveList([...mustHaveList, item]);
                    }
                  }}
                  className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer ${
                    mustHaveList.includes(item)
                      ? "bg-[#FFE2CC] text-[#FF8855] border-[#FFC5A5]"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-1">料理ジャンル</p>
            <div className="flex gap-3">
              {["指定なし", "和食", "洋食", "中華", "スイーツ"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCookingType(type)}
                  className={`px-5 py-2 rounded-full border shadow-sm cursor-pointer ${
                    cookingType === type
                      ? "bg-[#FFE2CC] text-[#FF8855] border-[#FFC5A5]"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleStartCooking}
            disabled={isLoading}
            className="text-lg font-bold rounded-full py-6 px-8 bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-lg hover:scale-105 transition"
          >
            {isLoading ? "生成中..." : "🍳  料理を始める"}
          </Button>
        </div>

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
                  className="bg-orange-300 hover:bg-orange-400 text-white px-10 py-3 rounded-full shadow-md cursor-pointer"
                >
                  🔄 もう一度
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </div>
    </div>
  );
}
