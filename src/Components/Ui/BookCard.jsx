import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { AiFillStar } from "react-icons/ai";
import { addToCart } from "../../Api/CartApi";
export default function BookCard({ book }) {
  const [loading, setLoading] = useState(false);
  if (!book) return null;

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(book.bookId, 1);
      alert("Book added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed to adsd book to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-5 bg-white shadow p-4 rounded-xl">
        <img
          src={book.image || "/RichDad.png"}
          alt={book.bookName || book.title }
          className="w-full sm:w-36 h-56 sm:h-48 object-cover rounded-lg mx-auto sm:mx-0"
        />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">{book.bookName || book.title }</h2>
            <p className="text-sm text-gray-500">Author: {book.author}</p>
          </div>

          <div className="flex items-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar
                key={star}
                className={
                  star <= Math.round(book?.rate || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-1 text-sm">{book.rate || "0"}</span>
            <span className="text-gray-400 text-sm">
              ({book.countReview || 0} {book.countReview === 1 ? "Review" : "Reviews"})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <span className="text-lg sm:text-xl font-bold text-center sm:text-left">
              ${Number(book.final_price || book.price || 0).toFixed(2)}
            </span>

            <div className="flex items-center justify-center sm:justify-end gap-2">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700 transition w-full sm:w-auto justify-center disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {loading ? "Adding..." : "Add To Cart"}
              </button>

              <button
                aria-label="Add to wishlist"
                className="rounded-lg p-2 border border-pink-500/75 hover:bg-pink-100"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
