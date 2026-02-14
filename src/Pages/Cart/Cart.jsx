// import { useEffect } from "react";
// import { useCartStore } from "../../Store/useCartStore";
// import CartRow from "./CartRow";

// export default function Cart() {
//   const { cartItems, loading, error, fetchCart } = useCartStore();

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (error) {
//     return <div className="text-center py-20 text-red-500">{error}</div>;
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-xl font-semibold">Your cart is empty</h2>
//       </div>
//     );
//   }

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0,
//   );

//   return (
//     <div className="container mx-auto py-10">
//       <div className="grid grid-cols-5 font-bold border-b-2 pb-2">
//         <div>Item</div>
//         <div>Quantity</div>
//         <div>Price</div>
//         <div>Total</div>
//         <div>Action</div>
//       </div>

//       {cartItems.map((item) => (
//         <CartRow key={item.id} item={item} />
//       ))}

//       <div className="flex justify-end mt-5 text-lg font-semibold">
//         Subtotal: {subtotal} EGP
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import { useCartStore } from "../../Store/useCartStore";
import CartRow from "./CartRow";
import { RiCoupon5Line } from "react-icons/ri";

export default function Cart() {
  const { cartItems = [], fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (cartItems.length === 0)
    return <div className="text-center py-20">Your cart is empty</div>;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto md:px-10 py-10 bg-gray-50">
      <div className="hidden md:grid md:grid-cols-[427px_1fr_1fr_1fr_auto] font-semibold text-gray-600 mb-4 px-2">
        <div>Item</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Price</div>
        <div className="text-center">Total</div>
        <div className="text-center">Action</div>
      </div>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartRow key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
        <div className="w-full md:w-1/2 bg-gray-300 p-6 md:p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>

          <p className="text-sm text-gray-500 pt-4 font-medium mb-2">
            Have a discount code?
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-full sm:w-auto">
              <RiCoupon5Line className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="outline-none text-sm w-full sm:w-40 bg-transparent"
              />
            </div>
            <button className="bg-[#3B2F4A] text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-800 transition w-full sm:w-auto">
              Apply
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 md:p-8 rounded-2xl shadow flex flex-col space-y-4 text-sm md:text-base">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>Free Delivery</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span>$4</span>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between font-semibold text-base">
            <span className="text-gray-500">Total</span>
            <span className="text-pink-600">${subtotal + 4}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium">
              Check Out
            </button>

            <button className="flex-1 border border-pink-500 text-pink-600 py-3 rounded-lg hover:bg-gray-100 transition">
              Keep Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
