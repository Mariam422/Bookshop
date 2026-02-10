import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount, onPageChange }) {
  return (
    <div className="mt-6 flex justify-center">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"flex gap-2"}
        pageClassName={
          "px-3 py-1 border rounded hover:bg-pink-100 cursor-pointer"
        }
        previousClassName={
          "px-3 py-1 border rounded hover:bg-pink-100 cursor-pointer"
        }
        nextClassName={
          "px-3 py-1 border rounded hover:bg-pink-100 cursor-pointer"
        }
        activeClassName={"bg-pink-500 text-white border-pink-500"}
      />
    </div>
  );
}