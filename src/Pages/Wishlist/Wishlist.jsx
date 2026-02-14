import { useEffect } from "react";
import { useWishlistStore } from "../../Store/useWishlistStore";
import CartRow from "../Cart/CartRow";
import { WiDirectionRight } from "react-icons/wi";

export default function Wishlist() {
  const {
    wishlistItems,
    fetchWishlist,
    removeFromWishlist,
    moveToCart,
    totalItems,
    totalPrice,
  } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (!wishlistItems || wishlistItems.length === 0)
    return <div className="text-center py-20">Your wishlist is empty</div>;

  return (
    <div className=" md:p-10 bg-gray-100">
      <div className="hidden md:grid md:grid-cols-[427px_1fr_1fr_1fr_auto] font-bold pb-3">
        <div>Item</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Total</div>
        <div>Action</div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {wishlistItems.map((item) => (
          <CartRow
            key={item.id}
            item={item}
            showQuantity={false}
            removeItem={removeFromWishlist}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <div className=" md:w-1/2 p-8 rounded-2xl shadow-md">
          <div className="mt-6 flex flex-col gap-3">
            <button className="flex items-center justify-between w-full bg-pink-600 text-white py-3 px-4 rounded-xl hover:bg-pink-700 transition font-medium">
              <span>
                {totalItems()} Item{totalItems() > 1 ? "s" : ""} ${totalPrice()}{" "}
                Check out
              </span>
              <div className="bg-white rounded p-1 flex items-center justify-center">
                <WiDirectionRight className="text-pink-600 text-xl" />
              </div>
            </button>

            <button
              onClick={moveToCart}
              className="border border-pink-500 py-3 text-pink-600 rounded-xl hover:bg-pink-100 transition font-medium"
            >
              Move to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
