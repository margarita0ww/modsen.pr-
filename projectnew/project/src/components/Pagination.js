import React from 'react';

const Pagination = ({ onLoadMore }) => {
  return (
    <div className="pagination mt-4">
      <button className="btn btn-primary" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default Pagination;
