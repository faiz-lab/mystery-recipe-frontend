import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FeedbackDialog({ isOpen, onClose, candidate, handleSubmit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        standard_name: candidate.suggestion.standard_name,
        internal_code: candidate.suggestion.internal_code,
        synonyms: candidate.suggestion.synonyms.join(", "),
        emoji: candidate.suggestion.emoji || "",
        category: candidate.suggestion.category,
        confidence: candidate.suggestion.confidence,
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleConfirm = () => {
        const correction = {
            standard_name: form.standard_name,
            internal_code: form.internal_code,
            synonyms: form.synonyms.split(",").map((s) => s.trim()).filter(Boolean),
            emoji: form.emoji,
            category: form.category,
            confidence: parseFloat(form.confidence),
        };
        handleSubmit(true, correction);
        onClose();
    };

    const handleReject = () => {
        handleSubmit(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600 text-xl font-bold">
                        AIの提案確認
                    </DialogTitle>
                </DialogHeader>

                {isEditing ? (
                    <div className="space-y-3">
                        <Input
                            value={form.standard_name}
                            onChange={(e) => handleChange("standard_name", e.target.value)}
                            placeholder="標準名称"
                        />
                        <Input
                            value={form.internal_code}
                            onChange={(e) => handleChange("internal_code", e.target.value)}
                            placeholder="internal_code"
                        />
                        <Input
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            placeholder="分類"
                        />
                        <Input
                            value={form.synonyms}
                            onChange={(e) => handleChange("synonyms", e.target.value)}
                            placeholder="同義語 (カンマ区切り)"
                        />
                        <Input
                            value={form.emoji}
                            onChange={(e) => handleChange("emoji", e.target.value)}
                            placeholder="絵文字"
                        />
                        <Input
                            value={form.confidence}
                            onChange={(e) => handleChange("confidence", e.target.value)}
                            placeholder="信頼度"
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                        />
                        <DialogFooter className="mt-4">
                            <Button onClick={handleConfirm} className="w-full bg-green-500 hover:bg-green-600 text-white">
                                ✅ 修正して登録
                            </Button>
                        </DialogFooter>
                    </div>
                ) : (
                    <div className="space-y-2 text-lg">
                        <p><b>食材名:</b> {candidate.userInput}</p>
                        <p><b>標準英語名:</b> {candidate.suggestion.standard_name}</p>
                        <p><b>internal_code:</b> {candidate.suggestion.internal_code}</p>
                        <p><b>分類:</b> {candidate.suggestion.category}</p>
                        <p><b>同義語:</b> {candidate.suggestion.synonyms.join(", ")}</p>
                        <p><b>絵文字:</b> {candidate.suggestion.emoji || "❓"}</p>
                        <p><b>信頼度:</b> {candidate.suggestion.confidence}</p>

                        <DialogFooter className="mt-4 flex justify-between">
                            <Button onClick={handleReject} className="bg-red-400 hover:bg-red-500 text-white px-6">🚫 キャンセル</Button>
                            <Button onClick={() => setIsEditing(true)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-6">✏️ 修正</Button>
                            <Button onClick={() => { handleSubmit(true); onClose(); }} className="bg-green-500 hover:bg-green-600 text-white px-6">✅ 登録</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
