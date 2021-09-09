import React from "react";

const Pagination = ({ userCount, usersPerPage, currentPage, onPageClick }) => {
  const pages = [];

  for (let i = 1; i < Math.ceil(userCount / usersPerPage) + 1; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      { currentPage }
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
