import React, { useRef, useState } from "react";

export default function CookingTimeInput({ cookingTime, setCookingTime }) {
  const maxTime = 30;
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const getColor = () => {
    if (cookingTime > 30) return "#EF5350";
    if (cookingTime > 20) return "#FF7043";
    if (cookingTime > 10) return "#FFA726";
    return "#FFCC80";
  };

  const percent = (cookingTime / maxTime) * 100;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updateValue(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const ratio = x / rect.width;
    const rawValue = ratio * maxTime;
    // 取整步长（step=5）
    const steppedValue = Math.round(rawValue / 1) * 1;
    setCookingTime(steppedValue);
  };

  return (
    <div className="flex flex-col gap-4 py-2 select-none">
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg">⏰ 料理時間</p>
        <div className="text-[#FF8855] font-bold text-xl">{cookingTime} 分</div>
      </div>

      <div
        ref={sliderRef}
        className="relative w-full h-6 flex items-center cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 背景条 */}
        <div className="absolute w-full h-3 bg-[#FFEFE5] rounded-full shadow-inner" />
        <div
          className="absolute h-3 rounded-full transition-all duration-100"
          style={{ width: `${percent}%`, backgroundColor: getColor() }}
        />

        {/* 自绘 Thumb */}
        <div
          className="absolute w-6 h-6 bg-[#FF8855] rounded-full shadow-md border-2 border-white transition-transform duration-150"
          style={{
            left: `calc(${percent}% - 12px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
}
