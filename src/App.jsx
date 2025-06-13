import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";

const ingredientEmojiMap = {
  // 蔬菜・野菜
  ニンジン: "🥕",
  じゃがいも: "🥔",
  玉ねぎ: "🧅",
  キャベツ: "🥬",
  ブロッコリー: "🥦",
  トマト: "🍅",
  きゅうり: "🥒",
  ピーマン: "🫑",
  なす: "🍆",
  ほうれん草: "🥬",
  とうもろこし: "🌽",
  レタス: "🥬",

  // 肉類・魚介類
  鶏肉: "🍗",
  豚肉: "🥩",
  牛肉: "🥩",
  ひき肉: "🥩",
  魚: "🐟",
  えび: "🦐",
  いか: "🦑",
  たこ: "🐙",
  貝: "🐚",
  ハム: "🥩",
  
  // 調味料・調味品
  味噌: "🫘",
  しょうゆ: "🧂",
  みりん: "🍶",
  砂糖: "🍬",
  塩: "🧂",
  酢: "🍶",
  ケチャップ: "🍅",
  マヨネーズ: "🥚",
  ソース: "🥫",

  // 穀類・米・パン
  米: "🍚",
  パン: "🍞",
  パスタ: "🍝",
  うどん: "🍜",
  そば: "🍜",
  ラーメン: "🍜",

  // 乳製品・卵
  牛乳: "🥛",
  チーズ: "🧀",
  ヨーグルト: "🥛",
  卵: "🥚",

  // 果物・フルーツ
  りんご: "🍎",
  バナナ: "🍌",
  いちご: "🍓",
  みかん: "🍊",
  ぶどう: "🍇",
  メロン: "🍈",
  スイカ: "🍉",
  パイナップル: "🍍",
  レモン: "🍋",
  さくらんぼ: "🍒",

  // 飲み物・ドリンク
  水: "💧",
  お茶: "🍵",
  コーヒー: "☕",
  ジュース: "🧃",
  ワイン: "🍷",
  ビール: "🍺",
};

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [stepIndex, setStepIndex] = useState(-1); // -1 means not started yet
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState([]);

  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      const name = inputValue.trim();
      const icon = ingredientEmojiMap[name] || "🍴"; // 如果匹配不到就用 🍴
      setIngredients((prev) => [...prev, { name, icon }]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartCooking = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/recipe`, {
        ingredients: ingredients.map((item) => item.name),
      });
      setSteps(res.data.steps);

      // 保留原来 800ms delay 效果
      setTimeout(() => {
        setStepIndex(0);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">ミステリーレシピ</h1>
        <p className="mt-2 text-gray-600 font-semibold">
          何ができるかわからない、自炊がちょっと楽しくなるシステム
        </p>
      </header>

      <section className="mb-8 max-w-xl mx-auto">
        <div className="flex space-x-2">
          <Input
            placeholder="食材を入力..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 防止默认提交
                handleAddIngredient();
              }
            }}
            className="h-12 text-lg px-4"
          />
          <Button
            className="h-12 px-6 text-lg font-semibold"
            onClick={handleAddIngredient}
          >
            追加
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            食材リスト
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AnimatePresence>
              {ingredients.map((item, index) => (
                <motion.div
                  key={item.name + index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center text-lg font-semibold">
                        <span className="text-2xl mr-2">{item.icon}</span>
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#F3F4F6] text-[#EF4444] hover:bg-[#F3F4F6] font-semibold"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        削除
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mb-12 text-center">
        {stepIndex === -1 ? (
          <Button
            size="lg"
            className="text-lg font-semibold px-6 py-6"
            onClick={handleStartCooking}
            disabled={isLoading}
          >
            {isLoading ? "準備中..." : "🍳 開始料理！"}
          </Button>
        ) : (
          <div className="space-y-4 max-w-xl mx-auto">
            <AnimatePresence initial={false}>
              {steps.slice(0, stepIndex + 1).map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, translateY: -10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-4 text-gray-800 font-medium">
                      STEP {index + 1}: {step}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {stepIndex < steps.length - 1 && (
              <Button size="lg" onClick={handleNextStep}>
                次のステップ ▶️
              </Button>
            )}

            {stepIndex === steps.length - 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-green-600 font-bold"
              >
                🎉 完成！
              </motion.p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
