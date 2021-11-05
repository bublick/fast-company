import React from "react";
// import User from "./user";

// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Qualities from "./qualities";
import { Link } from "react-router-dom";
import Table from "../common/table";

const UserTable = ({
    users,
    onRemove,
    onToogleBookmark,
    selectedSort,
    onSort
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToogleBookmark(user._id)}
                    className="btn"
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onRemove(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
    // <TableHeader {...{ onSort, selectedSort, columns }} />
    //         <TableBody {...{ columns, data: users }} />
};

UserTable.propTypes = {
    users: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UserTable;
