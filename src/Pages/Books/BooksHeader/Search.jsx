// import React from "react";
import { CiSearch } from "react-icons/ci";
import { LuMic } from "react-icons/lu";

// export default function Search() {
//   return (
//     <div className=" flex justify-center py-3.5">
//       <div className="flex items-center w-200 bg-white rounded-full overflow-hidden border-2 border-slate-200">
//         <input
//           type="text"
//           placeholder="Search"
//           className="flex-1 px-5 py-3 outline-none"
//         />
//         <LuMic className="w-5 h-5 text-gray-600" />
//         <CiSearch className="w-9 h-5  text-pink-600" />
//       </div>
//     </div>

//   );
// }

export default function Search({ onSearch }) {
  return (
    <div className="flex justify-center py-3.5">
      <div className="flex items-center w-200 bg-white rounded-full overflow-hidden border-2 border-slate-200">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-5 py-3 outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
        <LuMic className="w-5 h-5 text-gray-600" />
        <CiSearch className="w-9 h-5 text-pink-600" />
      </div>
    </div>
  );
}
