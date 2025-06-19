export default function CookingTypeSelector({ cookingType, setCookingType }) {
  const options = ["指定なし", "和食", "洋食", "中華", "スイーツ"];

  return (
    <div className="flex gap-3">
      {options.map((type) => (
        <button
          key={type}
          onClick={() => setCookingType(type)}
          className={`px-5 py-2 rounded-full border shadow-sm cursor-pointer transition-all duration-300 ease-in-out transform
            ${
              cookingType === type
                ? "bg-[#FFE2CC] text-[#FF8855] border-[#FFC5A5] scale-105"
                : "border-gray-300 text-gray-500 scale-100"
            }
            hover:scale-110 active:scale-95`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
