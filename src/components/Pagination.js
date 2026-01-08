import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const [goToPage, setGoToPage] = useState('');

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(goToPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setGoToPage('');
    }
  };

  const handleGoToPageInput = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setGoToPage(value);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems} candidates
      </div>
      
      <div className="pagination-controls">
        <div className="pagination">
          <button
            className="page-btn prev-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="page-dots">...</span>
              ) : (
                <button
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            className="page-btn next-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>

        <form className="go-to-page" onSubmit={handleGoToPage}>
          <label htmlFor="page-input">Go to:</label>
          <input
            id="page-input"
            type="text"
            value={goToPage}
            onChange={handleGoToPageInput}
            placeholder="Page"
            className="page-input"
            min="1"
            max={totalPages}
          />
          <button 
            type="submit" 
            className="go-btn"
            disabled={!goToPage || parseInt(goToPage) < 1 || parseInt(goToPage) > totalPages}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagination;