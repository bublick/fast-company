import React, {useState} from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";

const Users = ({ users: allUsers, onRemove, onToogleBookmark }) => {
  const [currentPage, setPage] = useState(1)
  const usersPerPage = 4
  const handlePageClick = (page) => {
    console.log(page);
    setPage(page)
  };
  const users = paginate(allUsers, currentPage, usersPerPage)
  return (
    <>
      {users.length === 0 ? (
        ""
      ) : (
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
          <Pagination
            userCount={allUsers.length}
            usersPerPage={usersPerPage}
            onPageClick={handlePageClick}
          />
        </>
      )}
    </>
  );
};

export default Users;
