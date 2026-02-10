import { useState, useEffect } from "react";
import BookCard from "./BookCard";

export default function Recommended({ recommended }) {
  if (!recommended || recommended.length === 0)
    return null;
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   setBooks([
  //     {
  //       id: 1,
  //       title: "Rich Dad And Poor Dad",
  //       author: "Robert T. Kiyosaki",
  //       price: 30,
  //       rating: 4.2,
  //       reviews: 132,
  //       image: "/RichDad.png",
  //     },
  //     {
  //       id: 2,
  //       title: "The Design Of Books",
  //       author: "Debbie Berne",
  //       price: 40,
  //       rating: 4.2,
  //       reviews: 210,
  //       image: "/Design.png",
  //     },
  //   ]);
  // }, []);

  return (
   <section className="px-10 py-16 bg-gray-100">
    <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommended && recommended.length > 0 ? (
        recommended.map((book, index) => (
          <BookCard key={book.id || book.bookId || index} book={book} />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  </section>
  );
}
