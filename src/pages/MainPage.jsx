import React, { useState } from "react";
import Header from "@/components/Header";
import IngredientInput from "@/components/IngredientInput";
import IngredientSelector from "@/components/IngredientSelector";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Button} from "@/components/ui/button";
import CookingTimeInput from "@/components/CookingTimeInput";
import IngredientCardList from "@/components/IngredientCardList.jsx";
import RecipeDialog from "@/components/RecipeDialog.jsx";
import FeedbackDialog from "@/components/FeedbackDialog";
import CookingTypeSelector from "@/components/CookingTypeSelector.jsx";
import InventoryDialog from "@/components/InventoryDialog.jsx";
import useMainPageState from "@/hooks/useMainPageState";

export default function MainPage() {
    const {
        ingredientName, setIngredientName,
        ingredientAmount, setIngredientAmount,
        ingredientUnit, setIngredientUnit,
        availableIngredients, setAvailableIngredients,
        mustHaveList, setMustHaveList,
        cookingType, setCookingType,
        cookingTime, setCookingTime,
        isLoading, isDialogOpen,
        setIsDialogOpen, isAdding, setFeedbackCandidate,
        steps, recipeName, errorMessage,
        isComposing, setIsComposing,
        feedbackCandidate, handleFeedbackSubmit,
        handleAddIngredient, handleStartCooking, handleReset,
    } = useMainPageState();

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [showMoodDetail, setShowMoodDetail] = useState(false);

    const emojiMap = Object.fromEntries(
        availableIngredients.map(item => [item.displayName, item.emoji || "❓"])
    );

    return (
        <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#FAFAFA] to-[#F7F7F7]">
            <Header/>

            <div className="flex-1 flex justify-center items-start py-6 px-2">
                <div className="max-w-3xl w-full space-y-6 relative pb-32">
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FF8855] mb-3 tracking-tight drop-shadow">
                            ミステリーレシピ
                        </h1>
                        <p className="text-[#777] text-lg">
                            冷蔵庫の食材＋今日の気分から最適レシピを提案！
                        </p>
                    </header>

                    <section
                        className="bg-white rounded-3xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 border border-gray-100 shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            🧺 持っている食材
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

                        <IngredientCardList
                            ingredients={availableIngredients}
                            limit={3}
                            onShowMore={() => setIsInventoryOpen(true)}
                            onRemove={(index) =>
                                setAvailableIngredients(
                                    availableIngredients.filter((_, i) => i !== index)
                                )
                            }
                        />

                        <h2 className="text-2xl font-semibold text-gray-700 flex items-center justify-between">
                            <span>🌤️ 今日の気分</span>
                            <button
                                onClick={() => setShowMoodDetail(!showMoodDetail)}
                                className="text-sm text-gray-500 underline"
                            >
                                {showMoodDetail ? "閉じる" : "詳細設定"}
                            </button>
                        </h2>

                        <div>
                            <p className="font-medium mb-1">🎯 必ず使いたい食材</p>
                            <IngredientSelector
                                ingredientOptions={availableIngredients.map(
                                    (item) => item.displayName
                                )}
                                mustHaveList={mustHaveList}
                                setMustHaveList={setMustHaveList}
                                emojiMap={emojiMap}
                            />
                        </div>

                        <CookingTimeInput
                            cookingTime={cookingTime}
                            setCookingTime={setCookingTime}
                        />

                        {showMoodDetail && (
                            <div>
                                <p className="font-medium mb-1">🍽️ 調理タイプ</p>
                                <CookingTypeSelector
                                    cookingType={cookingType}
                                    setCookingType={setCookingType}
                                />
                            </div>
                        )}
                    </section>

                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md text-center z-20">
                        <Button
                            size="lg"
                            onClick={handleStartCooking}
                            disabled={isLoading}
                            className="w-full text-lg font-bold rounded-full py-6 px-8 bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            {isLoading ? "生成中..." : "🍳 料理を始める"}
                        </Button>
                    </div>

                    <RecipeDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        errorMessage={errorMessage}
                        recipeName={recipeName}
                        steps={steps}
                        onRetry={handleReset}
                    />

                    {feedbackCandidate && (
                        <FeedbackDialog
                            isOpen={!!feedbackCandidate}
                            onClose={() => setFeedbackCandidate(null)}
                            candidate={feedbackCandidate}
                            handleSubmit={handleFeedbackSubmit}
                        />
                    )}

                    <InventoryDialog
                        isOpen={isInventoryOpen}
                        onClose={() => setIsInventoryOpen(false)}
                        ingredients={availableIngredients}
                        setIngredients={setAvailableIngredients}
                    />

                    <LoadingOverlay isLoading={isLoading} isAdding={isAdding}/>
                </div>
            </div>
        </div>
    );
}
