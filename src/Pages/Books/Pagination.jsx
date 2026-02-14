import React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
});

export default function Pagination({ count, page, onPageChange, rowsPerPage, totalBooks }) {
  const { items } = usePagination({
    count,
    page: page + 1,
    onChange: (event, value) => {
      onPageChange(value - 1);
    },
  });

  const startBook = page * rowsPerPage + 1;
  const endBook = Math.min((page + 1) * rowsPerPage, totalBooks);

  return (
    <div className="flex flex-col items-center mt-6">
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <span className="px-2">…</span>;
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={`px-3 py-1 rounded ${selected ? "bg-pink-600 text-white" : "bg-white border border-gray-300"} hover:bg-pink-100`}
                {...item}
              >
                {page}
              </button>
            );
          } else if (type === "previous") {
            children = (
              <button
                type="button"
                className="px-3 py-1 rounded text-pink-400 hover:bg-pink-100 flex items-center gap-1"
                {...item}
              >
                <span>&lt;</span>
                <span>Previous</span>
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                type="button"
                className="px-3 py-1 rounded  text-pink-600  hover:bg-pink-100 flex items-center gap-1"
                {...item}
              >
                <span>Next</span>
                <span>&gt;</span>
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
      <p className="text-sm text-gray-500 mt-2">
        {startBook}-{endBook} of {totalBooks}+ Book available
      </p>
    </div>
  );
}
