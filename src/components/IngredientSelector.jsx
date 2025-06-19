export default function IngredientSelector({
  ingredientOptions,
  mustHaveList,
  setMustHaveList,
}) {
  return (
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
          className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer transition-all duration-300 ease-in-out transform
            ${
              mustHaveList.includes(item)
                ? "bg-[#FFE2CC] text-[#FF8855] border-[#FFC5A5] scale-105"
                : "border-gray-300 text-gray-500 scale-100"
            }
            hover:scale-110 active:scale-95`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
