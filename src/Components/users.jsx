import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, onRemove, onToogleBookmark }) => {
    const [currentPage, setPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const usersPerPage = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageClick = (page) => {
        setPage(page);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const count = filteredUsers.length;
    const users = paginate(filteredUsers, currentPage, usersPerPage);
    const clearFilter = () => {
        setSelectedProf();
        setPage(1);
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <>
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
                                            {...user}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                itemsPerPage={usersPerPage}
                                currentPage={currentPage}
                                onPageClick={handlePageClick}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    // allUsers: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};
export default Users;
