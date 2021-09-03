import React from "react";

const Pagination = ({ userCount, pageSize, currentPage, onPageClick }) => {
  const pages = [];

  for (let i = 1; i < Math.ceil(userCount / pageSize) + 1; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li className="page-item" key={page}>
              <button className="page-link" onClick={() => onPageClick(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
