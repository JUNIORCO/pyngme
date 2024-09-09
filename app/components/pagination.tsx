"use client";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  path: string;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  path,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const maxVisiblePages = 4; // Adjust this number to show more or fewer page buttons

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  console.log("currentPage", pageNumbers);

  return (
    <div className="flex justify-center mt-4">
      <div className="join">
        {pageNumbers.map((number) => (
          <Link
            key={number}
            href={`${path}?page=${number}&limit=${itemsPerPage}`}
            className={`join-item btn ${
              number === currentPage ? "btn-active" : ""
            }`}
          >
            {number}
          </Link>
        ))}
      </div>
    </div>
  );
}
