import { useEffect, useState } from "react";
import { PaginationNext, PaginationPrev } from "@/svg";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData,
  currPage,
  setCurrPage,
}) => {
  const totalPage = Math.ceil(items.length / countOfPage);

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
      return;
    }
    setCurrPage(idx);
    window.scrollTo(0, 0);
    paginatedData(items, (idx - 1) * countOfPage, countOfPage);
  }

  useEffect(() => {
    paginatedData(items, (currPage - 1) * countOfPage, countOfPage);
  }, [items, currPage, countOfPage]);

  function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) throw "maxLength must be at least 5";

    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
    if (totalPages <= maxLength) {
      // no breaks in list
      return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      // no break on left of page
      return range(1, maxLength - sideWidth - 1).concat(
        0,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      // no break on right of page
      return range(1, sideWidth).concat(
        0,
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
    }
    // Breaks on both sides
    return range(1, sideWidth).concat(
      0,
      range(page - leftWidth, page + rightWidth),
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }

  return (
    <nav>
      {totalPage > 1 && (
        <ul>
          <li>
            <button
              onClick={() => setPage(currPage - 1)}
              className={`tp-pagination-prev prev page-numbers ${
                currPage === 1 && "disabled"
              }`}
            >
              <PaginationPrev />
            </button>
          </li>

          {getPageList(totalPage, currPage, 5).map((n, i) => (
            <li key={i} onClick={() => setPage(n)} className={`${n === 0 ? "dots" : ""}`}>
              <span className={`${currPage === n ? "current" : ""}`}>{n || "..."}</span>
            </li>
          ))}

          <li>
            <button
              onClick={() => setPage(currPage + 1)}
              className={`next page-numbers ${
                currPage === totalPage ? "disabled" : ""
              }`}
            >
              <PaginationNext />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
