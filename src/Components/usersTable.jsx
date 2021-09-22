import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, onRemove, onToogleBookmark, onSort }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">
                        Профессия
                    </th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">
                        Встретились, раз
                    </th>
                    <th onClick={() => onSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => onSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return (
                        <User
                            key={user._id}
                            onRemove={onRemove}
                            onToogleBookmark={onToogleBookmark}
                            user={user}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};
export default UserTable;
