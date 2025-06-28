import { useState } from "react";
import axios from "axios";

export default function useMainPageState() {
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("適量");
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [mustHaveList, setMustHaveList] = useState([]);
    const [cookingType, setCookingType] = useState("指定なし");
    const [cookingTime, setCookingTime] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [steps, setSteps] = useState([]);
    const [recipeName, setRecipeName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [feedbackCandidate, setFeedbackCandidate] = useState(null);
    const [isComposing, setIsComposing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const resetInput = () => {
        setIngredientName("");
        setIngredientAmount("");
        setIngredientUnit("適量");
    };

    const handleAddIngredient = async () => {
        if (ingredientName.trim() === "") return;
        setIsAdding(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ingredients/resolve`, {
                raw_input: ingredientName
            });

            if (res.data.status === "hit" || res.data.status === "fuzzy" || res.data.status === "hit_gpt") {
                const doc = res.data.data;
                const ingredientObj = {
                    displayName: ingredientName,
                    internalCode: doc.internal_code,
                    emoji: doc.emoji || "❓",
                    quantity: ingredientAmount || "適量",
                    unit: ingredientAmount ? ingredientUnit : ""
                };
                setAvailableIngredients(prev => [...prev, ingredientObj]);
            } else if (res.data.status === "suggest") {
                setFeedbackCandidate({
                    userInput: ingredientName,
                    suggestion: res.data.data
                });
            } else {
                alert("未登録の食材です");
            }
        } catch (e) {
            alert("API呼び出し失敗");
            console.error(e);
        } finally {
            resetInput();
            setIsAdding(false);
        }
    };


    const handleFeedbackSubmit = async (accepted, correction = null) => {
        if (!feedbackCandidate) return;
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ingredients/feedback`, {
            user_input: feedbackCandidate.userInput,
            accepted: accepted,
            correction: correction
        });
        if (accepted) {
            const doc = correction || feedbackCandidate.suggestion;
            const ingredientObj = {
                displayName: feedbackCandidate.userInput,
                internalCode: doc.internal_code,
                emoji: doc.emoji || "❓",
                quantity: ingredientAmount || "適量",
                unit: ingredientAmount ? ingredientUnit : ""
            };
            setAvailableIngredients(prev => [...prev, ingredientObj]);
        }
        setFeedbackCandidate(null);
        resetInput();
    };

    const handleStartCooking = async () => {
        setIsLoading(true);
        setErrorMessage("");
        setSteps([]);
        try {
            const availableCodes = availableIngredients.map((item) => item.internalCode);
            const requiredCodes = mustHaveList.map((name) => {
                const match = availableIngredients.find((item) => item.displayName === name);
                return match?.internalCode || name;
            });
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/recipes/recommend`, {
                available_ingredients: availableCodes,
                required_ingredients: requiredCodes,
                max_cooking_time: cookingTime,
            });
            if (res.data.found) {
                setRecipeName(res.data.data.name);
                setSteps(res.data.data.steps);
            } else {
                setErrorMessage(res.data.message);
            }
            setIsDialogOpen(true);
        } catch (error) {
            setErrorMessage("エラーが発生しました。もう一度お試しください。");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setShowResult(false);
        setRecipeName("");
        setSteps([]);
    };

    return {
        ingredientName, setIngredientName,
        ingredientAmount, setIngredientAmount,
        ingredientUnit, setIngredientUnit,
        availableIngredients, setAvailableIngredients,
        mustHaveList, setMustHaveList,
        cookingType, setCookingType,
        cookingTime, setCookingTime,
        isLoading, isDialogOpen, setIsDialogOpen,
        isAdding, setIsAdding, showResult,
        steps, recipeName, errorMessage,
        isComposing, setIsComposing,
        feedbackCandidate,  setFeedbackCandidate, handleFeedbackSubmit,
        handleAddIngredient, handleStartCooking, handleReset,
    };
}
