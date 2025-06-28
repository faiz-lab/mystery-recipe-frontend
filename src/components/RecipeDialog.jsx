import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export default function RecipeDialog({
                                         isOpen,
                                         onClose,
                                         errorMessage,
                                         recipeName,
                                         steps,
                                         onRetry,
                                     }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-green-500">
                        {errorMessage ? "結果がありませんでした" : `${recipeName} 🎯`}
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    {errorMessage
                        ? "条件に合うレシピが見つかりませんでした。"
                        : "おすすめのレシピの詳細手順を表示します:"}
                </DialogDescription>

                {errorMessage ? (
                    <div className="flex flex-col justify-center items-center text-center py-8">
                        <div className="text-5xl mb-4">😢</div>
                        <div className="text-2xl font-semibold text-[#FF7043] mb-2">
                            ごめんなさい！
                        </div>
                        <div className="text-lg text-gray-600">
                            条件に合うレシピが見つかりませんでした。
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                            食材を少し変えてもう一度お試しください！
                        </div>
                    </div>
                ) : (
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
                )}

                <DialogFooter className="mt-8">
                    <Button
                        onClick={() => {
                            onClose();
                            onRetry();
                        }}
                        className="bg-orange-300 hover:bg-orange-400 text-white px-10 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg font-semibold"
                    >
                        🔄 もう一度
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
