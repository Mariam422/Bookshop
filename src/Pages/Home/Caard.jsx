// import React from "react";

// export default function Caard({ card }) {
//   return (
//     <div className="bg-white rounded-xl p-4">
//       <img
//         src={card.image}
//         alt={card.title}
//         className="h-48 w-full object-cover rounded-lg"
//       />
//       <h3 className="mt-4 font-semibold text-lg">{card.title}</h3>
//       <p className="text-gray-500 text-sm">{card.discription}</p>
//     </div>
//   );
// }
export default function Caard({ card }) {
  if (!card) return null;

  return (
    <div className="bg-white rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:shadow-xl">
      <img
        src={card.image}
        alt={card.title}
      />
      <h3 className="mt-4 font-semibold text-lg">
        {card.title}
      </h3>
      <p className="text-gray-500 text-sm">
        {card.description}
      </p>
    </div>
  );
}