import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import IngredientInput from "@/components/IngredientInput";
import IngredientSelector from "@/components/IngredientSelector";
import CookingTypeSelector from "@/components/CookingTypeSelector";
import RecipeResult from "@/components/RecipeResult";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import CookingTimeInput from "@/components/CookingTimeInput";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

const synonymMap = {
  "ニンジン": "carrot",
  "じゃがいも": "potato",
  "玉ねぎ": "onion",
  "キャベツ": "cabbage",
  "ブロッコリー": "broccoli",
  "トマト": "tomato",
  "卵": "egg",
  "牛乳": "milk",
  "鶏肉": "chicken_thigh",
  "豚肉": "pork",
  "魚": "fish",
  "米": "rice",
  "パン": "bread",
  "パスタ": "pasta"
};

export default function MainPage() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("適量");
  const [availableIngredients, setAvailableIngredients] = useState([
    { name: "玉ねぎ", amount: "200", unit: "g" },
    { name: "ニンジン", amount: "100", unit: "g" },
    { name: "鶏肉", amount: "300", unit: "g" },
    { name: "卵", amount: "3", unit: "個" }
  ]);
  const [mustHaveList, setMustHaveList] = useState([]);
  const [cookingType, setCookingType] = useState("指定なし");
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [cookingTime, setCookingTime] = useState(15);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      const availableIngredientNames = availableIngredients.map(item => {
        return synonymMap[item.name] || item.name;
      });
      const requiredIngredientNames = mustHaveList.map(name => synonymMap[name] || name);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/recommend`,
        {
          available_ingredients: availableIngredientNames,
          required_ingredients: requiredIngredientNames,
          max_cooking_time: cookingTime,
        }
      );
      setRecipeName(res.data.name);
      setSteps(res.data.steps);
      setIsLoading(false);
      setShowResult(true);
      setIsDialogOpen(true);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FAFAFA] to-[#F7F7F7]">
      <Header />

      <div className="flex-1 flex justify-center items-start py-12 px-4">
        <div className="max-w-3xl w-full space-y-12 relative">
          {/* 标题区 */}
          <header className="text-center">
            <h1 className="text-5xl font-extrabold text-[#FF8855] mb-3 tracking-tight drop-shadow">
              ミステリーレシピ
            </h1>
            <p className="text-[#777] text-lg">
              冷蔵庫の食材＋今日の気分から最適レシピを提案！
            </p>
          </header>

          {/* 卡片功能区 */}
          <section className="bg-white rounded-3xl p-8 space-y-6 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-semibold text-gray-700">
              持っている食材
            </h2>

            <IngredientInput
              ingredientName={ingredientName}
              setIngredientName={setIngredientName}
              ingredientAmount={ingredientAmount}
              setIngredientAmount={setIngredientAmount}
              ingredientUnit={ingredientUnit}
              setIngredientUnit={setIngredientUnit}
              handleAddIngredient={handleAddIngredient}
              isComposing={isComposing}
              setIsComposing={setIsComposing}
            />

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
              <IngredientSelector
                ingredientOptions={ingredientOptions}
                mustHaveList={mustHaveList}
                setMustHaveList={setMustHaveList}
              />
            </div>

            <CookingTimeInput
              cookingTime={cookingTime}
              setCookingTime={setCookingTime}
            />

            <div>
              <p className="font-medium mb-1">料理ジャンル</p>
              <CookingTypeSelector
                cookingType={cookingType}
                setCookingType={setCookingType}
              />
            </div>
          </section>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleStartCooking}
              disabled={isLoading}
              className="text-lg font-bold rounded-full py-6 px-8 bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              {isLoading ? "生成中..." : "🍳 料理を始める"}
            </Button>
          </div>
          {/* 这里插入新的 Dialog 区域 */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-green-500">{recipeName} 🎯</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                おすすめのレシピの詳細手順を表示します:
              </DialogDescription>
              <ul className="space-y-3 mt-4">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="bg-[#FAFAFA] rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      STEP {step.step_no}: {step.instruction}
                    </li>
                ))}
              </ul>

              <DialogFooter className="mt-8">
                <Button
                    onClick={() => {
                      setIsDialogOpen(false);
                      handleReset();
                    }}
                    className="bg-orange-300 hover:bg-orange-400 text-white px-10 py-3 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
                >
                  🔄 もう一度
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <LoadingOverlay isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
