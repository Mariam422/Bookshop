// import { useState } from "react";
// import BooksList from "./BooksList/BooksList";
// import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
// import BooksTabs from "./BooksHeader/BooksTabs";
// import Search from "./BooksHeader/Search";
// import Sort from "./BooksHeader/Sort";

// export default function Books() {
//   const [category, setCategory] = useState("Business");
//   const [sortType, setSortType] = useState("");

//   const books = [
//     {
//       title: "Rich Dad Poor Dad",
//       image: "/RichDad.png",
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//       price: 40,
//       rating: 4.2,
//       reviews: 210,
//       author: "Robert T. Kiyosaki",
//       year: 1997,
//       discount: 25,
//       category: "Business",
//     },
//     {
//       title: "Rich Dad Poor Dad",
//       image: "/RichDad.png",
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//       price: 40,
//       rating: 4.2,
//       reviews: 210,
//       author: "Robert T. Kiyosaki",
//       year: 1997,
//       discount: 25,
//       category: "Business",
//     },
//     {
//       title: "Rich Dad Poor Dad",
//       image: "/RichDad.png",
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//       price: 40,
//       rating: 4.2,
//       reviews: 210,
//       author: "Robert T. Kiyosaki",
//       year: 1997,
//       discount: 25,
//       category: "Business",
//     },
//     {
//       title: "The Design of Everyday Things",
//       image: "/theDesign.png",
//       description:
//         "A book about the principles of good design in everyday objects.",
//       price: 45,
//       rating: 4.6,
//       reviews: 150,
//       author: "Don Norman",
//       year: 2013,
//       discount: 20,
//       category: "Art",
//     },
//     {
//       title: "Power",
//       image: "/Power.png",
//       description: "Insights on power dynamics and influence.",
//       price: 40,
//       rating: 4.3,
//       reviews: 200,
//       author: "Robert Greene",
//       year: 1998,
//       discount: 15,
//       category: "Self Help",
//     },
//     {
//       title: "The Craft of Research",
//       image: "/TheCraft.png",
//       description: "A guide to conducting effective academic research.",
//       price: 38,
//       rating: 4.5,
//       reviews: 90,
//       author: "Wayne C. Booth",
//       year: 2016,
//       discount: 10,
//       category: "Self Help",
//     },
//     {
//       title: "The Design of Book",
//       image: "/Design.png",
//       description: "Exploring the art and design of books.",
//       price: 50,
//       rating: 4.7,
//       reviews: 70,
//       author: "Adrian Frutiger",
//       year: 2010,
//       discount: 5,
//       category: "Art",
//     },
//     {
//       title: "The International Bestseller",
//       image: "/thinking.png",
//       description: "Analysis of books that became worldwide hits.",
//       price: 42,
//       rating: 4.2,
//       reviews: 60,
//       author: "John Smith",
//       year: 2020,
//       discount: 12,
//       category: "Self Help",
//     },
//     {
//       title: "The 7 Habits of Highly Effective People",
//       image: "/The7.png",
//       description: "Classic guide to personal and professional effectiveness.",
//       price: 48,
//       rating: 4.9,
//       reviews: 300,
//       author: "Stephen R. Covey",
//       year: 1989,
//       discount: 20,
//       category: "Self Help",
//     },
//     {
//       title: "The Alchemist",
//       image: "/TheAlchemist.png",
//       description: "A philosophical tale about following your dreams.",
//       price: 35,
//       rating: 4.8,
//       reviews: 500,
//       author: "Paulo Coelho",
//       year: 1988,
//       discount: 15,
//       category: "Fantasy",
//     },
//   ];

//   let filteredBooks = books.filter((book) => book.category === category);

//   if (sortType === "low") filteredBooks.sort((a, b) => a.price - b.price);
//   if (sortType === "high") filteredBooks.sort((a, b) => b.price - a.price);

//   return (
//     <div className="bg-gray-50 min-h-screen p-4">
//       <div className="flex flex-col lg:flex-row gap-6 p-5">
//         <aside className="lg:w-1/4">
//           <FiltersSidebar />
//         </aside>

//         <div className="flex-1 flex flex-col gap-4">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="flex-1">
//               <Search />
//             </div>
//             <div className="w-40 sm:w-48 md:w-56">
//               <Sort onSort={setSortType} />
//             </div>
//           </div>

//           <BooksTabs onChange={setCategory} />

//           <BooksList books={filteredBooks} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import BooksList from "./BooksList/BooksList";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import BooksTabs from "./BooksHeader/BooksTabs";
import Search from "./BooksHeader/Search";
import Sort from "./BooksHeader/Sort";

const tabs = [
  "Business",
  "Self Help",
  "History",
  "Romance",
  "Fantasy",
  "Art",
  "Kids",
  "Music",
  "Cooking",
];

export default function Books() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Business");
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://bookstore.eraasoft.pro/api/book");

        const apiBooks = res.data.data.books.map((b) => ({
          id: b.bookId,
          title: b.bookName,
          author: b.author,
          description: b.description,
          price: b.final_price || b.price,
          discount: b.discount,
          rate: b.rate || 0,
          reviews: b.countReview,
          image:
            b.bookImage && b.bookImage.length > 0
              ? b.bookImage[0].image
              : "/RichDad.png",
          category: b.category_name || "Other",
          year: b.publicationYear,
        }));
        setBooks(apiBooks);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  let filteredBooks = books.filter(
    (book) =>
      book.category === category &&
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortType === "low") filteredBooks.sort((a, b) => a.price - b.price);
  if (sortType === "high") filteredBooks.sort((a, b) => b.price - a.price);


  if (loading) return <p className="text-center py-20">Loading books...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-6 p-5">
        <aside className="lg:w-1/4">
          <FiltersSidebar />
        </aside>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Search onSearch={setSearchTerm} />
            </div>
            <div className="w-40 sm:w-48 md:w-56">
              <Sort onSort={setSortType} />
            </div>
          </div>

          <BooksTabs tabs={tabs} activeTab={category} onChange={setCategory} />

          {filteredBooks.length > 0 ? (
            <BooksList books={filteredBooks} />
          ) : (
            <p className="text-center py-20">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
