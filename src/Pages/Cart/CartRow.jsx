// import { useCartStore } from "../../Store/useCartStore";

// export default function CartRow({ item }) {
//   const { updateQuantity, removeFromCart } = useCartStore();

//   return (
//     <div className="grid grid-cols-5 items-center py-4 border-b">
//       <div>{item.product.title}</div>

//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//           className="px-2 bg-gray-200 rounded"
//         >
//           -
//         </button>

//         <span>{item.quantity}</span>

//         <button
//           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//           className="px-2 bg-gray-200 rounded"
//         >
//           +
//         </button>
//       </div>

//       <div>{item.product.price} EGP</div>

//       <div>{item.product.price * item.quantity} EGP</div>

//       <button onClick={() => removeFromCart(item.id)} className="text-red-500">
//         Delete
//       </button>
//     </div>
//   );
// }import { useCartStore } from "../../Store/useCartStore";

import { CgAdd } from "react-icons/cg";
import { FiMinusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

export default function CartRow({
  item,
  updateQuantity,
  removeItem,
  showQuantity = true,
  customAction = null,
}) {
  return (
    <div className="grid md:grid-cols-[427px_1fr_1fr_1fr_auto] items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">{item.product.title}</h2>
          <span className="text-gray-500 text-sm md:text-base">
            Author: {item.product.author}
          </span>
          <p className="text-gray-600 text-sm line-clamp-2">
            {item.product.description || "No description available."}
          </p>
          <div className="flex items-center gap-2 mt-1 border border-gray-300 rounded px-3 py-1 text-gray-500 font-medium text-sm">
            <TbTruckDelivery size={14} /> Free Shipping
          </div>
          <span className="text-gray-400 text-xs mt-2">
            ASIN: {item.product.asin}
          </span>
        </div>
      </div>

      {showQuantity && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            <FiMinusCircle className="text-pink-600 text-xl" />
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            <CgAdd className="text-pink-600 text-xl" />
          </button>
        </div>
      )}

      <div className="text-center font-medium">${item.product.price}</div>
      <div className="text-center font-semibold">
        ${item.product.price * item.quantity}
      </div>

      <div className="flex justify-center gap-2">
        {removeItem && (
          <button onClick={() => removeItem(item.id)}>
            <FaRegTrashAlt className="text-pink-400 hover:text-red-500 transition text-lg" />
          </button>
        )}
        {customAction && customAction}
      </div>
    </div>
  );
}
