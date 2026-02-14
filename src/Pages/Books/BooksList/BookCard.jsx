import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { AiFillStar } from "react-icons/ai";

export default function BookCard({ book }) {
  const rating = Number(book?.rating) || 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-xl p-4 hover:shadow-md transition">
      <Link
        to={`/books/${book.id}`}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1"
      >
        <img
          src={book.image || book.bookImage?.[0]?.image || "/RichDad.png"}
          alt={book.title || book.bookName}
          className="w-full sm:w-28 h-56 sm:h-40 object-contain rounded mx-auto sm:mx-0"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base sm:text-lg hover:text-pink-600 transition">
              {book.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
              {book.description}
            </p>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-2 justify-between">
            <div className="flex items-center gap-0.5 flex-wrap">
              {[1, 2, 3, 4, 5].map((star) => (
                <AiFillStar
                  key={star}
                  className={
                    star <= Math.round(rating)
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }
                />
              ))}
              <span className="ml-1 text-sm">{book?.rate}</span>
              <span className="text-gray-400 text-sm">
                ({book?.reviews} {book?.reviews === 1 ? "Review" : "Reviews"})
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
              Author: {book.author} • {book.year}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col sm:items-end justify-between gap-3 sm:gap-2 mt-3 sm:mt-0">
        {book.discount && (
          <span className="text-xs border border-yellow-400 text-yellow-500 px-2 py-1 rounded w-fit">
            {book.discount}% Discount
          </span>
        )}
        <p className="text-lg sm:text-xl font-bold">${book.price}</p>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 w-full sm:w-auto">
            <ShoppingCart size={18} />
            Add To Cart
          </button>
          <button className="border rounded-lg p-2 hover:bg-pink-100 text-pink-600 flex items-center justify-center w-full sm:w-auto">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// import { Heart, ShoppingCart } from "lucide-react";
// import { AiFillStar } from "react-icons/ai";

// export default function BookCard({ book }) {
//   if (!book) return null;

//   const rating = Number(book?.rate) || 0;
//   const mainImage =
//     book.bookImage && book.bookImage.length > 0
//       ? book.bookImage[0].image
//       : "/RichDad.png";

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-xl p-4 hover:shadow-md transition">
//       <img
//         src={mainImage}
//         alt={book.bookName}
//         className="w-full sm:w-28 h-56 sm:h-40 object-contain rounded mx-auto sm:mx-0"
//       />

//       <div className="flex-1 flex flex-col justify-between">
//         <div>
//           <h3 className="font-semibold text-base sm:text-lg">{book.bookName}</h3>
//           <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
//             {book.description}
//           </p>

//           <div className="flex items-center gap-0.5 mt-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <AiFillStar
//                 key={star}
//                 className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-500"}
//               />
//             ))}
//             <span className="ml-1 text-sm">{book.rate || 0}</span>
//             <span className="text-gray-400 text-sm">
//               ({book.countReview || 0} {book.countReview === 1 ? "Review" : "Reviews"})
//             </span>
//           </div>

//           <div className="text-xs sm:text-sm text-gray-500 mt-1">
//             Author: {book.author} • {book.publicationYear}
//           </div>
//         </div>

//         <div className="flex flex-col sm:items-end gap-2 mt-2">
//           {book.discount && (
//             <span className="text-xs border border-yellow-400 text-yellow-500 px-2 py-1 rounded w-fit">
//               {book.discount}% Discount
//             </span>
//           )}
//           <p className="text-lg sm:text-xl font-bold">
//             ${Number(book.final_price || book.price).toFixed(2)}
//           </p>

//           <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//             <button className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 w-full sm:w-auto">
//               <ShoppingCart size={18} />
//               Add To Cart
//             </button>

//             <button className="border rounded-lg p-2 hover:bg-pink-100 text-pink-600 flex items-center justify-center w-full sm:w-auto">
//               <Heart size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
