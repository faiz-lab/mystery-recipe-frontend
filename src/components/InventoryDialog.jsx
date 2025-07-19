import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function InventoryDialog({ isOpen, onClose, ingredients, setIngredients }) {
  const unitOptions = ["g", "kg", "ml", "l", "個", "本", "枚", "適量"]; 

  const handleChange = (index, key, value) => {
    setIngredients(prev => prev.map((item, i) => i === index ? { ...item, [key]: value } : item));
  };

  const handleRemove = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-500">食材リスト</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto py-2">
          {ingredients.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex-1 text-sm">{item.displayName}</div>
              <Input
                value={item.quantity}
                onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
                className="w-16 h-8 text-sm"
              />
              <select
                value={item.unit}
                onChange={(e) => handleChange(idx, 'unit', e.target.value)}
                className="h-8 rounded-md border-gray-300 text-gray-500 text-sm"
              >
                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-500 text-xs px-2"
              >
                削除
              </button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-orange-400 hover:bg-orange-500 text-white">閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

