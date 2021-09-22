import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, onRemove, onToogleBookmark }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретились, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
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
    onToogleBookmark: PropTypes.func.isRequired
};
export default UserTable;
