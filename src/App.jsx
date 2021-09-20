import React, { useState, useEffect } from "react";
import api from "./API";
import Users from "./Components/users";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleUserRemove = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleAddToFavorite = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onRemove={handleUserRemove}
                onToogleBookmark={handleAddToFavorite}
            />
        </>
    );
};

export default App;
