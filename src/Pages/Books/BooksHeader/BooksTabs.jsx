// import { useState } from "react";
// const tabs = [
//   "Business",
//   "Self Help",
//   "History",
//   "Romance",
//   "Fantasy",
//   "Art",
//   "Kids",
//   "Music",
//   "Cooking",
// ];
// export default function BooksTabs({ onChange }) {
//   const [active, setActive] = useState("Business");

//   const handleClick = (tab) => {
//     setActive(tab);
//     onChange(tab);
//   };

//   return (
//     <div className=" flex justify-center flex-wrap  gap-2 py-3.5 ">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => handleClick(tab)}
//           className={`px-3 py-2 rounded-md border transition
//             ${
//               active === tab
//                 ? "bg-pink-500 text-white border-pink-500"
//                 : "text-gray-500 hover:bg-gray-100"
//             }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// }
export default function BooksTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex justify-center flex-wrap gap-2 py-3.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-2 rounded-md border transition ${
            activeTab === tab
              ? "bg-pink-500 text-white border-pink-500"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
