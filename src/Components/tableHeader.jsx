import React from "react";
import PropTypes from "prop-types";
import { iconCaretDown, iconCaretUp } from "../utils/icons";

let currentSortedByField = "name";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        currentSortedByField = item;

        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    return (
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}

                            {currentSortedByField === columns[column].path &&
                                selectedSort.order === "asc" &&
                                iconCaretUp}

                            {currentSortedByField === columns[column].path &&
                                selectedSort.order === "desc" &&
                                iconCaretDown}
                        </th>
                    );
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
