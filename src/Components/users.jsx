import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import PropTypes from "prop-types";
import _ from "lodash";

const Users = ({ users: allUsers, onRemove, onToogleBookmark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "ASC" });
    const usersPerPage = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const users = paginate(sortedUsers, currentPage, usersPerPage);
    const clearFilter = () => {
        setSelectedProf();
        setCurrentPage(1);
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
                        <UserTable
                            users={users}
                            onRemove={onRemove}
                            onToogleBookmark={onToogleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />

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
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};
export default Users;
