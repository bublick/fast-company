import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleUserRemove = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const renderPhrase = (number) => {
    let phraseClasses = "badge m-1 bg-";
    if (number === 1 || number >= 5) {
      phraseClasses += "primary";
      let phrase = number + " человек тусанет с тобой сегодня";
      return <div className={phraseClasses}>{phrase}</div>;
    } else if (number > 1 && number < 5) {
      phraseClasses += "primary";
      let phrase = number + " человека тусанет с тобой сегодня";
      return <div className={phraseClasses}>{phrase}</div>;
    } else {
      phraseClasses += "danger";
      let phrase = "Никто с тобой не тусанет";
      return <div className={phraseClasses}>{phrase}</div>;
    }
  };

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {users.length == false ? (
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
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      <ul className="p-0">
                        {user.qualities.map((quality) => {
                          let qualityClass = "badge m-1 bg-";
                          qualityClass += quality.color;
                          return (
                            <li className={qualityClass} key={quality._id}>
                              {quality.name}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} / 5</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleUserRemove(user._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Users;
