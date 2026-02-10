import { FaSliders } from "react-icons/fa6";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function FiltersSidebar() {
  const [showMore, setShowMore] = useState({
    categories: false,
    publishers: false,
    years: false,
  });

  const [openSection, setOpenSection] = useState({
    categories: false,
    publishers: false,
    years: false,
  });

  const categories = [
    { name: "All Categories", count: 1450 },
    { name: "Business", count: 140 },
    { name: "Kids", count: 309 },
    { name: "Art", count: 102 },
    { name: "History", count: 204 },
    { name: "Romance", count: 89 },
    { name: "Fantasy", count: 47 },
    { name: "Self Help", count: 163 },
    { name: "Cooking", count: 211 },
    { name: "Sports", count: 92 },
  ];

  const publishers = [
    { name: "Paulo Coelho", count: 210 },
    { name: "Jane Austen", count: 140 },
    { name: "Charles Dickens", count: 309 },
    { name: "Mark Twain", count: 102 },
    { name: "Virginia Woolf", count: 204 },
    { name: "Leo Tolstoy", count: 89 },
    { name: "Fyodor Dostoevsky", count: 47 },
    { name: "Haruki Murakami", count: 163 },
    { name: "Gabriel Márquez", count: 211 },
    { name: "Chinua Achebe", count: 92 },
  ];

  const years = [
    { name: "2024", count: 210 },
    { name: "2023", count: 140 },
    { name: "2022", count: 309 },
    { name: "2021", count: 102 },
    { name: "2020", count: 204 },
    { name: "2019", count: 89 },
    { name: "2018", count: 47 },
    { name: "2017", count: 163 },
    { name: "2016", count: 211 },
    { name: "2015", count: 92 },
  ];

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderFilterSection = (title, items, sectionKey) => {
    const isOpen = openSection[sectionKey];
    const isExpanded = showMore[sectionKey];
    const visibleItems = isExpanded ? items : items.slice(0, 5);

    return (
      <div>
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex justify-between items-center text-gray-700 font-medium text-sm py-2 px-2 bg-gray-50 rounded hover:bg-gray-100"
        >
          {title}
          <IoIosArrowDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="flex flex-col gap-2 text-sm mt-2">
            <h3 className="font-semibold flex items-center gap-2 text-base text-pink-300 pb-2">
              {title}
            </h3>

            {visibleItems.map((item) => (
              <label
                key={item.name}
                className="flex justify-between items-center gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="accent-black" />
                  {item.name}
                </div>
                <span className="text-gray-400 text-xs">({item.count})</span>
              </label>
            ))}

            {!isExpanded && items.length > 5 && (
              <button
                onClick={() =>
                  setShowMore((prev) => ({ ...prev, [sectionKey]: true }))
                }
                className="text-pink-500 text-sm mt-1 hover:underline text-left"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
        <FaSliders className="text-gray-700" />
        Filters
      </h3>

      <div className="bg-white rounded-xl p-4 space-y-6 shadow-sm">
        {renderFilterSection("Categories", categories, "categories")}
        {renderFilterSection("Publisher", publishers, "publishers")}
        {renderFilterSection("Year", years, "years")}
      </div>
    </div>
  );
}
