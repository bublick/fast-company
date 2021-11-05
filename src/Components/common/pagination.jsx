import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, itemsPerPage, currentPage, onPageClick }) => {
    const pages = [];

    const pageCount = Math.ceil(itemsCount / itemsPerPage);
    if (pageCount === 1) return null;
    for (let i = 1; i < Math.ceil(itemsCount / itemsPerPage) + 1; i++) {
        pages.push(i);
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li
                            className={
                                "page-item" +
                                (page === currentPage ? " active" : "")
                            }
                            key={page}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageClick(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired
};

export default Pagination;
