import React from "react";

const Pagination = ({
  handlePagePrev,
  handlePageNext,
  currentPage,
  noOfPages,
  handlePageChange,
}) => {
  return (
    <div>
      <div className="pagination-container">
        <button
          disabled={currentPage === 0}
          onClick={handlePagePrev}
          className="page-number"
        >
          ◀️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            onClick={() => handlePageChange(n)}
            className={"page-number " + (n === currentPage ? "active" : "")}
            key={n}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          onClick={handlePageNext}
          className="page-number"
        >
          ▶️
        </button>
      </div>
    </div>
  );
};

export default Pagination;
