// export default function Caard({ card }) {
//   if (!card) return null;

//   return (
//     <div className="bg-white rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:shadow-xl">
//       <img
//         src={card.image}
//         alt={card.title}
//       />
//       <h3 className="mt-4 font-semibold text-lg">
//         {card.title}
//       </h3>
//       <p className="text-gray-500 text-sm">
//         {card.description}
//       </p>
//     </div>
//   );
// }
import React from "react";

export default function AboutCard() {
  const items = [
    {
      id: 1,
      title: "Fast & Reliable Shipping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/shipping-fast.png",
    },
    {
      id: 2,
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/credit-card-buyer.png",
    },
    {
      id: 3,
      title: "Easy Returns",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/restock.png",
    },
    {
      id: 4,
      title: "24/7 Customer Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/user-headset.png",
    },
  ];

  return (
    <div className="bg-gray-50 py-20 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((card) => (
        <div
          key={card.id}
          className="rounded-xl p-6 text-center transition-all duration-300 ease-in-out hover:shadow-xl"
        >
          <img src={card.image} alt={card.title} />
          <h3 className="mt-4 font-semibold text-lg">{card.title}</h3>
          <p className="text-gray-500 text-sm mt-2">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
