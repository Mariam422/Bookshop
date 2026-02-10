// import BookCard from "./BookCard";

// export default function BooksList({ books }) {
//   return (
//     <div className="flex flex-col gap-4">
//       {books.map((book) => (
//         <BookCard key={book.id} book={book} />
//       ))}
//     </div>
//   );
// }
import BookCard from "./BookCard";

export default function BooksList({ books }) {
  if (!books || books.length === 0) return <p>No books available</p>;

  return (
    <div className="flex flex-col gap-4">
      {books.map((book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  );
}
