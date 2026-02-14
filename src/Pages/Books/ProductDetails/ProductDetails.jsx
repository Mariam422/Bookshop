import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import { CgAdd } from "react-icons/cg";
import { FiMinusCircle } from "react-icons/fi";
import { Reviews } from "../Reviews/Reviews";

export default function ProductDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const [reviewsData, setReviewsData] = useState([
    {
      userName: "John Smith",
      userAvatar: "/Profile.png",
      userRole: "Verified Purchase",
      rating: 5,
      date: "28/07/2024",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.",
    },
    {
      userName: "John Smith",
      userAvatar: "/Profile.png",
      userRole: "Verified Purchase",
      rating: 3,
      date: "28/07/2024",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.",
    },
  ]);

  const [recommendedBooks, setRecommendedBooks] = useState([
    { id: 101, title: "Rich Dad Poor Dad 2", author: "Robert T. Kiyosaki" },
    { id: 102, title: "Cashflow Quadrant", author: "Robert T. Kiyosaki" },
  ]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("https://bookstore.eraasoft.pro/api/book");
        const books = res.data.data.books;
        const foundBook = books.find((b) => String(b.bookId) === String(id));
        if (!foundBook) return;

        setBook({
          title: foundBook.bookName,
          author: foundBook.author || "Robert T. Kiyosaki",
          publicationDate: foundBook.publicationYear || 1997,
          ASIN: foundBook.ASIN || "Bo9TWSRMCB",
          language: foundBook.language || "English",
          Publisher: foundBook.Publisher || "Printer",
          pages: foundBook.pages || 336,
          format: foundBook.format || "Paperback",
          price: foundBook.final_price || foundBook.price,
          rating: foundBook.rate || 0,
          reviews: foundBook.countReview || 0,
          cover: foundBook.bookImage?.[0]?.image || "/RichDad.png",
          thumbnails: foundBook.bookImage?.map((img) => img.image) || [],
          description: foundBook.description,
          BestSeller: foundBook.BestSeller || "#3",
        });
      } catch (err) {
        console.error("Failed to fetch book details", err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={book.cover || "/RichDad.png"}
            alt={book.title}
            className="w-60 sm:w-72 h-80 sm:h-96 object-cover rounded-lg border"
          />
          <div className="flex gap-2 sm:gap-3 mt-3 flex-wrap justify-center lg:justify-start">
            {book.thumbnails?.map((thumb, i) => (
              <img
                key={i}
                src={thumb}
                alt={`thumb-${i}`}
                className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded border cursor-pointer hover:border-pink-500"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            {book.title}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
            {book.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-600">
            <span>
              Author:{" "}
              <span className="font-medium text-gray-800">{book.author}</span>
            </span>
            <span>{book.publicationDate}</span>
            <span>{book.pages} Pages</span>
            <span>{book.language}</span>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(book.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-500 text-sm">
              ({book.reviews} Reviews)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-3 sm:gap-0">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${book.price}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-lg"
                >
                  <FiMinusCircle className="text-pink-700" />
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-lg"
                >
                  <CgAdd className="text-pink-700" />
                </button>
              </div>
              <button className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-500 transition">
                Add To Cart
              </button>
              <button className="border p-2 rounded-lg text-pink-600 hover:bg-pink-100">
                <TiHeartOutline />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap gap-6 border-b text-gray-500 font-medium">
          <button
            className={`pb-2 ${activeTab === "details" ? "text-black border-b-2 border-orange-600" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`pb-2 ${activeTab === "reviews" ? "text-black border-b-2 border-orange-600" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Customer Reviews
          </button>
          <button
            className={`pb-2 ${activeTab === "recommended" ? "text-black border-b-2 border-orange-600" : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended For You
          </button>
        </div>

        <div className="mt-6 text-gray-700 leading-relaxed">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              <p>
                <span className="font-bold">Book Title:</span> {book.title}
              </p>
              <p>
                <span className="font-bold">Author:</span> {book.author}
              </p>
              <p>
                <span className="font-bold">Publication Date:</span>{" "}
                {book.publicationDate}
              </p>
              <p>
                <span className="font-bold">ASIN:</span> {book.ASIN}
              </p>
              <p>
                <span className="font-bold">Language:</span> {book.language}
              </p>
              <p>
                <span className="font-bold">Publisher:</span> {book.Publisher}
              </p>
              <p>
                <span className="font-bold">Pages:</span> {book.pages}
              </p>
              <p>
                <span className="font-bold">Book Format:</span> {book.format}
              </p>
              <p>
                <span className="font-bold">Best Seller Rank:</span>{" "}
                {book.BestSeller}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {reviewsData.map((r, i) => (
                <Reviews key={i} review={r} />
              ))}
            </div>
          )}

          {activeTab === "recommended" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {recommendedBooks.map((book) => (
                <div key={book.id} className="p-4 border rounded">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-gray-500 text-sm">By {book.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
