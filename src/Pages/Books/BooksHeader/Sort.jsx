export default function Sort({ onSort }) {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="
        mt-4
        h-[50px]
        px-5
        bg-white
        border-2 border-slate-200
        rounded-full
        text-gray-600
        outline-none
        focus:ring-2 focus:ring-pink-200
        cursor-pointer
      "
    >
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  );
}
