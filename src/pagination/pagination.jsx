import React, { useEffect, useState } from "react";

const Pagination = (props) => {
  const { activeNumber, totalPages, currentPages } = props;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(currentPages);
  }, [currentPages]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      activeNumber(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      activeNumber(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    activeNumber(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    if (currentPage < 5) {
      // Show 1 2 3 4 ... 20
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) pageNumbers.push("...", totalPages);
    } else if (currentPage >= 5 && currentPage <= totalPages - 4) {
      // Show 1 ... currentPage-1 currentPage currentPage+1 ... totalPages
      pageNumbers.push(1, "...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", totalPages);
    } else {
      // Show 1 ... 17 18 19 20
      pageNumbers.push(1, "...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="prev-button"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="page-numbers">
        {renderPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={`page-button ${
              pageNumber === currentPage ? "active" : ""
            }`}
            onClick={() =>
              typeof pageNumber === "number" && handlePageClick(pageNumber)
            }
            disabled={pageNumber === "..." || pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className="next-button"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
